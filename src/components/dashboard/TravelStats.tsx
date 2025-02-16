import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Camera } from 'lucide-react';
import { recordTrip, uploadBusProof } from '@/services/firebase';
import type { UserStats, Trip } from '@/types/sustainability';

interface Props {
  userId: string;
  stats: UserStats | null;
}

export default function TravelStats({ userId, stats }: Props) {
  const [selectedMode, setSelectedMode] = useState<'car' | 'bus' | 'flight'>('car');
  const [distance, setDistance] = useState('');
  const [busPhoto, setBusPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Set default location
          setLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }
  }, []);

  const handleTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!distance || !location) return;

    try {
      let proofUrl = '';
      if (selectedMode === 'bus' && busPhoto) {
        proofUrl = await uploadBusProof(userId, busPhoto);
      }

      const carbonEmission = calculateCarbonEmission(Number(distance), selectedMode);
      
      await recordTrip({
        userId,
        type: selectedMode,
        distance: Number(distance),
        timestamp: new Date().toISOString(),
        carbonEmission,
        proof: proofUrl,
        lat: location.lat,
        lng: location.lng
      });

      toast({
        title: "Trip recorded successfully",
        description: "Your sustainability score has been updated.",
      });

      setDistance('');
      setBusPhoto(null);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error recording trip",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const calculateCarbonEmission = (distance: number, mode: 'car' | 'bus' | 'flight'): number => {
    const emissionFactors = {
      car: 0.2, // kg CO2 per km
      bus: 0.08,
      flight: 0.25
    };
    return distance * emissionFactors[mode];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="record" className="w-full">
          <TabsList>
            <TabsTrigger value="record">Record Trip</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <form onSubmit={handleTripSubmit} className="space-y-4">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={selectedMode === 'car' ? 'default' : 'outline'}
                  onClick={() => setSelectedMode('car')}
                >
                  Car
                </Button>
                <Button
                  type="button"
                  variant={selectedMode === 'bus' ? 'default' : 'outline'}
                  onClick={() => setSelectedMode('bus')}
                >
                  Bus
                </Button>
                <Button
                  type="button"
                  variant={selectedMode === 'flight' ? 'default' : 'outline'}
                  onClick={() => setSelectedMode('flight')}
                >
                  Flight
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Distance (km)</Label>
                <Input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="Enter distance in kilometers"
                />
              </div>

              {selectedMode === 'bus' && (
                <div className="space-y-2">
                  <Label>Upload Proof</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBusPhoto(e.target.files?.[0] || null)}
                    />
                    <Button type="button" size="icon">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Button type="submit">Record Trip</Button>
            </form>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">{stats?.totalCarTrips || 0}</div>
                <div className="text-sm text-gray-500">Car Trips</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">{stats?.totalBusTrips || 0}</div>
                <div className="text-sm text-gray-500">Bus Trips</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">{stats?.totalFlights || 0}</div>
                <div className="text-sm text-gray-500">Flights</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 