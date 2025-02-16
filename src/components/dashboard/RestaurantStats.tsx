import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';
import { recordRestaurantVisit } from '@/services/firebase';
import type { UserStats, SustainableRestaurant } from '@/types/sustainability';
import { toast } from 'sonner';

interface Props {
  userId: string;
  stats: UserStats | null;
}

export default function RestaurantStats({ userId, stats }: Props) {
  const [restaurants, setRestaurants] = useState<SustainableRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('');
  const { toast } = useToast();

  const fetchSustainableRestaurants = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'sustainable_restaurants'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SustainableRestaurant[];
      setRestaurants(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error fetching restaurants",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchSustainableRestaurants();
  }, [fetchSustainableRestaurants]);

  const handleVisitRecord = async () => {
    if (!selectedRestaurant) return;

    try {
      const restaurant = restaurants.find(r => r.id === selectedRestaurant);
      if (!restaurant) return;

      await recordRestaurantVisit({
        userId,
        restaurantId: selectedRestaurant,
        timestamp: new Date().toISOString(),
        points: calculatePoints(restaurant.sustainabilityScore)
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
          <div className="space-y-2">
            <Label>Select Restaurant</Label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} - Sustainability Score: {restaurant.sustainabilityScore}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={handleVisitRecord} disabled={!selectedRestaurant}>
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