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
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';

interface Props {
  userId: string;
  stats: UserStats | null;
  onScoreUpdate: (score: number) => void;
}

type TransportMode = 'walk' | 'bicycle' | 'scooter' | 'carpool' | 'train' | 'subway' | 'bus' | 'car' | 'flight';

interface CarpoolDetails {
  passengers: number;
}

const getGeminiScore = async (mode: TransportMode, distance: number, passengers?: number) => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `As a sustainability expert, calculate a sustainability score (0-100) for this travel choice:
              Mode of transport: ${mode}
              Distance traveled: ${distance} km
              ${mode === 'carpool' ? `Number of passengers: ${passengers}` : ''}
              
              Consider these factors:
              - Carbon emissions per km for this transport mode
              - Environmental impact
              - Energy efficiency
              - Sustainable transport hierarchy
              
              For reference:
              - Walking/Cycling: Most sustainable (80-100 points)
              - Public transit: Very sustainable (60-80 points)
              - Carpooling: Moderately sustainable (50-70 points)
              - Single-occupancy car: Less sustainable (20-40 points)
              - Short flights: Least sustainable (0-20 points)
              
              Return only a number between 0 and 100.`
          }]
        }]
      })
    });

    const data = await response.json();
    const scoreText = data.candidates[0].content.parts[0].text;
    const score = parseInt(scoreText.match(/\d+/)[0]); // Extract first number from response
    
    return isNaN(score) ? 50 : Math.min(Math.max(score, 0), 100);
  } catch (error) {
    console.error('Error getting Gemini score:', error);
    return 50; // Default score if API fails
  }
};

export default function TravelStats({ userId, stats, onScoreUpdate }: Props) {
  const [selectedMode, setSelectedMode] = useState<TransportMode>('car');
  const [distance, setDistance] = useState('');
  const [passengers, setPassengers] = useState('2');
  const { toast } = useToast();

  const handleModeSelect = (mode: TransportMode) => {
    setSelectedMode(mode);
  };

  const resetForm = () => {
    setDistance(''); // Clear distance input
    setPassengers('2'); // Reset passengers to default
    const distanceInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    if (distanceInput) {
      distanceInput.value = ''; // Explicitly clear the input value
    }
  };

  const handleTripSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const distanceNum = parseFloat(distance);
    if (!distance || isNaN(distanceNum)) {
      toast({
        title: "Error",
        description: "Please enter a valid distance",
        variant: "destructive",
      });
      return;
    }

    try {
      let score = 50; // Base score

      // Calculate score based on mode and distance
      switch (selectedMode) {
        case 'walk':
          score += 30;
          break;
        case 'bicycle': // Fixed bicycle case
          score += 30;
          break;
        case 'scooter':
          score += 20;
          break;
        case 'train':
          score += 20;
          break;
        case 'subway': // Fixed subway case
          score += 20;
          break;
        case 'bus':
          score += 15;
          break;
        case 'carpool':
          score += (parseInt(passengers) > 2 ? 10 : 5);
          break;
        case 'car':
          score -= Math.min(distanceNum * 0.5, 30);
          break;
        case 'flight':
          score -= Math.min(distanceNum * 0.1, 40);
          break;
      }

      // Adjust score based on distance for all modes
      if (distanceNum > 100) {
        score -= 10;
      } else if (distanceNum > 50) {
        score -= 5;
      }

      // Ensure score stays within bounds
      const finalScore = Math.min(Math.max(Math.round(score), 0), 100);

      const statsRef = doc(db, 'user_stats', userId);
      const statsDoc = await getDoc(statsRef);
      
      let updatedStats: UserStats = statsDoc.exists() 
        ? { ...statsDoc.data() as UserStats }
        : {
            userId,
            totalWalks: 0,
            totalBicycleRides: 0,
            totalScooterRides: 0,
            totalCarpools: 0,
            totalTrainRides: 0,
            totalSubwayRides: 0,
            totalBusTrips: 0,
            totalCarTrips: 0,
            totalFlights: 0,
            sustainabilityScore: finalScore,
            createdAt: new Date().toISOString()
          };

      // Update trip counts with proper type checking
      switch (selectedMode) {
        case 'walk':
          updatedStats.totalWalks = (updatedStats.totalWalks || 0) + 1;
          break;
        case 'bicycle':
          updatedStats.totalBicycleRides = (updatedStats.totalBicycleRides || 0) + 1;
          break;
        case 'scooter':
          updatedStats.totalScooterRides = (updatedStats.totalScooterRides || 0) + 1;
          break;
        case 'carpool':
          updatedStats.totalCarpools = (updatedStats.totalCarpools || 0) + 1;
          break;
        case 'train':
          updatedStats.totalTrainRides = (updatedStats.totalTrainRides || 0) + 1;
          break;
        case 'subway':
          updatedStats.totalSubwayRides = (updatedStats.totalSubwayRides || 0) + 1;
          break;
        case 'bus':
          updatedStats.totalBusTrips = (updatedStats.totalBusTrips || 0) + 1;
          break;
        case 'car':
          updatedStats.totalCarTrips = (updatedStats.totalCarTrips || 0) + 1;
          break;
        case 'flight':
          updatedStats.totalFlights = (updatedStats.totalFlights || 0) + 1;
          break;
      }

      // Update the sustainability score
      updatedStats.sustainabilityScore = finalScore;

      // Update Firestore
      await setDoc(statsRef, updatedStats);

      // Update local state
      onScoreUpdate(finalScore);

      toast({
        title: "Trip recorded successfully",
        description: `New sustainability score: ${finalScore}`,
      });

      // Reset the form using the new resetForm function
      resetForm();
      
    } catch (error) {
      console.error('Error recording trip:', error);
      toast({
        title: "Error recording trip",
        description: "Failed to record your trip. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="record" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="record">Record Trip</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="record">
            <form onSubmit={handleTripSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {[
                  'walk', 'bicycle', 'scooter',
                  'carpool', 'train', 'subway',
                  'bus', 'car', 'flight'
                ].map((mode) => (
                  <Button
                    key={mode}
                    type="button"
                    variant={selectedMode === mode ? 'default' : 'outline'}
                    onClick={() => handleModeSelect(mode as TransportMode)}
                    className="capitalize"
                  >
                    {mode}
                  </Button>
                ))}
              </div>

              {selectedMode === 'carpool' && (
                <div className="space-y-2">
                  <Label>Number of Passengers</Label>
                  <Input
                    type="number"
                    min="2"
                    max="8"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Distance (km)</Label>
                <Input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="Enter distance in kilometers"
                  required
                />
              </div>

              <Button type="submit">Record Trip</Button>
            </form>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-3 gap-4">
              <StatCard title="Walks" value={stats?.totalWalks || 0} />
              <StatCard title="Bicycle Rides" value={stats?.totalBicycleRides || 0} />
              <StatCard title="Scooter Rides" value={stats?.totalScooterRides || 0} />
              <StatCard title="Carpools" value={stats?.totalCarpools || 0} />
              <StatCard title="Train Rides" value={stats?.totalTrainRides || 0} />
              <StatCard title="Subway Rides" value={stats?.totalSubwayRides || 0} />
              <StatCard title="Bus Trips" value={stats?.totalBusTrips || 0} />
              <StatCard title="Car Trips" value={stats?.totalCarTrips || 0} />
              <StatCard title="Flights" value={stats?.totalFlights || 0} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Helper component for stat cards
const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="text-center p-4 bg-secondary rounded-lg">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-500">{title}</div>
  </div>
); 