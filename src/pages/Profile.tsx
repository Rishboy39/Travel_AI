import { useAuth } from "@/components/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/integrations/firebase/config";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Email</label>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Account Created</label>
            <p className="text-gray-600">
              {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
            </p>
          </div>

          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            className="w-full mt-4"
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 