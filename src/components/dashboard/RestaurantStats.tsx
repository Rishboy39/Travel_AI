import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';
import { recordRestaurantVisit } from '@/services/firebase';
import type { UserStats, SustainableRestaurant } from '@/types/sustainability';
import { Scan } from 'lucide-react'; // Import the Scan icon

interface Props {
  userId: string;
  stats: UserStats | null;
  mapCenter?: google.maps.LatLng;
}

export default function RestaurantStats({ userId, stats, mapCenter }: Props) {
  const [restaurants, setRestaurants] = useState<SustainableRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const fetchNearestRestaurants = useCallback(async () => {
    if (!mapCenter) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const { lat, lng } = mapCenter;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        const nearestRestaurants = data.results.slice(0, 3).map((place: any) => ({
          id: place.place_id,
          name: place.name,
          distance: place.geometry.location,
          address: place.vicinity
        }));
        setRestaurants(nearestRestaurants);
        toast({
          title: "Scan Complete",
          description: "Found the 3 nearest restaurants!",
        });
      } else {
        throw new Error('No restaurants found');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error fetching nearby restaurants",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  }, [mapCenter, toast]);

  const handleScan = () => {
    setIsScanning(true);
    fetchNearestRestaurants();
  };

  const handleVisitRecord = async () => {
    if (!selectedRestaurant) return;

    try {
      const restaurant = restaurants.find(r => r.id === selectedRestaurant);
      if (!restaurant) return;

      await recordRestaurantVisit({
        userId,
        restaurantId: selectedRestaurant,
        timestamp: new Date().toISOString(),
        points: calculatePoints(50)
      });

      toast({
        title: "Visit recorded successfully",
        description: "Points added to your account!",
      });

      setSelectedRestaurant('');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error recording visit",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const calculatePoints = (sustainabilityScore: number): number => {
    return Math.round(sustainabilityScore * 10);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainable Restaurant Visits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label>Select Nearby Restaurant</Label>
              <select
                className="w-full p-2 border rounded-md"
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
              >
                <option value="">Select a restaurant</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name} - {restaurant.address}
                  </option>
                ))}
              </select>
            </div>
            <Button 
              onClick={handleScan} 
              disabled={isScanning}
              className="border border-green-600 bg-green-600 text-white hover:bg-green-700"
            >
              <Scan className="w-4 h-4 mr-2" />
              {isScanning ? 'Scanning...' : 'Scan Area'}
            </Button>
          </div>

          <Button 
            onClick={handleVisitRecord} 
            disabled={!selectedRestaurant} 
            className="w-full border border-green-600 bg-green-600 text-white hover:bg-green-700"
          >
            Record Visit
          </Button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Your Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">
                  {stats?.totalSustainableRestaurantVisits || 0}
                </div>
                <div className="text-sm text-gray-500">Total Visits</div>
              </div>
              <div className="text-center p-4 bg-secondary rounded-lg">
                <div className="text-2xl font-bold">
                  {stats?.points || 0}
                </div>
                <div className="text-sm text-gray-500">Total Points</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
