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
  const [sustainabilityScore, setSustainabilityScore] = useState<number>(DUMMY_STATS.sustainabilityScore);

  useEffect(() => {
    if (!user?.uid) return;

    try {
      const unsubscribe = onSnapshot(
        doc(db, 'user_stats', user.uid),
        (doc) => {
          if (doc.exists()) {
            setStats(doc.data() as UserStats);
            setSustainabilityScore(doc.data()?.sustainabilityScore || 0);
          } else {
            setStats(DUMMY_STATS);
            setSustainabilityScore(DUMMY_STATS.sustainabilityScore);
          }
        },
        (error) => {
          console.error('Error fetching stats:', error);
          setStats(DUMMY_STATS);
          setSustainabilityScore(DUMMY_STATS.sustainabilityScore);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up listener:', error);
      setStats(DUMMY_STATS);
      setSustainabilityScore(DUMMY_STATS.sustainabilityScore);
    }
  }, [user?.uid]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Sustainability Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SustainabilityScore score={sustainabilityScore} />
          <TravelStats 
            userId={user?.uid || ''} 
            stats={stats} 
            onScoreUpdate={setSustainabilityScore} 
          />
        </div>
        
        <div className="space-y-6">
          <div className="relative z-0">
            <TripMap userId={user?.uid || ''} />
          </div>
          <RestaurantStats userId={user?.uid || ''} stats={stats} />
        </div>
      </div>
    </div>
  );
} 