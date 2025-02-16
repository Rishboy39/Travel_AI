import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '@/integrations/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/config';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initializeUserStats = async (userId: string) => {
    await setDoc(doc(db, 'user_stats', userId), {
      userId,
      sustainabilityScore: 50,
      totalFlights: 0,
      totalCarTrips: 0,
      totalBusTrips: 0,
      totalSustainableRestaurantVisits: 0,
      points: 0,
      createdAt: new Date().toISOString()
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await initializeUserStats(userCredential.user.uid);
      toast.success("Account created successfully!");
      navigate('/dashboard');
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-green-600">Create an account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-600">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="border border-green-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-600">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="border border-green-600"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-green-600 text-white hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full text-green-600 hover:underline"
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Already have an account? Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 