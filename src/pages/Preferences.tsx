
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
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
      const { data, error } = await supabase
        .from('travel_preferences')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setPreferences(data || []);
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
      const { error } = await supabase
        .from('travel_preferences')
        .upsert(
          {
            user_id: user.id,
            preference_type: type,
            preference_value: value,
          },
          {
            onConflict: 'user_id,preference_type',
          }
        );

      if (error) throw error;

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
