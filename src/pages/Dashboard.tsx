import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';
import SustainabilityScore from '@/components/dashboard/SustainabilityScore';
import TravelStats from '@/components/dashboard/TravelStats';
import RestaurantStats from '@/components/dashboard/RestaurantStats';
import TripMap from '@/components/dashboard/TripMap';
import type { UserStats } from '@/types/sustainability';

const DUMMY_STATS: UserStats = {
  userId: '123',
  sustainabilityScore: 75,
  totalFlights: 2,
  totalCarTrips: 15,
  totalBusTrips: 30,
  totalSustainableRestaurantVisits: 8,
  points: 450,
  createdAt: new Date().toISOString()
};

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>(DUMMY_STATS);

  useEffect(() => {
    if (!user?.uid) return;

    try {
      const unsubscribe = onSnapshot(
        doc(db, 'user_stats', user.uid),
        (doc) => {
          if (doc.exists()) {
            setStats(doc.data() as UserStats);
          } else {
            setStats(DUMMY_STATS);
          }
        },
        (error) => {
          console.error('Error fetching stats:', error);
          setStats(DUMMY_STATS);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up listener:', error);
      setStats(DUMMY_STATS);
    }
  }, [user?.uid]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Sustainability Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SustainabilityScore score={stats.sustainabilityScore} />
        <TripMap userId={user?.uid || '123'} />
        <TravelStats userId={user?.uid || '123'} stats={stats} />
        <RestaurantStats userId={user?.uid || '123'} stats={stats} />
      </div>
    </div>
  );
} 