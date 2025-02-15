import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/integrations/firebase/config';
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import type { TravelPreference } from '@/types/groups';

const PREFERENCE_TYPES = [
  'accommodation',
  'transportation',
  'activities',
  'budget',
  'destination'
] as const;

export default function Preferences() {
  const [preferences, setPreferences] = useState<TravelPreference[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchPreferences();
  }, [user, navigate]);

  const fetchPreferences = async () => {
    try {
      const prefsQuery = query(
        collection(db, 'travel_preferences'),
        where('user_id', '==', user?.uid)
      );
      const snapshot = await getDocs(prefsQuery);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TravelPreference[];
      setPreferences(data);
    } catch (error: any) {
      toast({
        title: "Error fetching preferences",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (type: string, value: string) => {
    if (!user) return;

    try {
      const prefQuery = query(
        collection(db, 'travel_preferences'),
        where('user_id', '==', user.uid),
        where('preference_type', '==', type)
      );
      const prefSnapshot = await getDocs(prefQuery);
      
      const prefData = {
        user_id: user.uid,
        preference_type: type,
        preference_value: value,
        updated_at: new Date().toISOString(),
      };

      if (prefSnapshot.empty) {
        await setDoc(doc(collection(db, 'travel_preferences')), {
          ...prefData,
          created_at: new Date().toISOString(),
        });
      } else {
        await setDoc(doc(db, 'travel_preferences', prefSnapshot.docs[0].id), prefData);
      }

      toast({
        title: "Success",
        description: "Preference updated successfully!",
      });

      fetchPreferences();
    } catch (error: any) {
      toast({
        title: "Error updating preference",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Travel Preferences</h1>

      <div className="space-y-4">
        {PREFERENCE_TYPES.map((type) => {
          const preference = preferences.find(p => p.preference_type === type);
          return (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="capitalize">{type}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <Label htmlFor={type}>Your preference</Label>
                    <Input
                      id={type}
                      value={preference?.preference_value || ''}
                      onChange={(e) => updatePreference(type, e.target.value)}
                      placeholder={`Enter your ${type} preference`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
