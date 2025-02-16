import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { auth } from "@/integrations/firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      navigate('/');
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl">
            Blessed
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-green-600">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-green-600">
                  Dashboard
                </Link>
                <Link to="/rewards" className="hover:text-green-600">
                  Rewards
                </Link>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-green-600 text-white hover:bg-green-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block hover:text-green-600">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block hover:text-green-600">
                  Dashboard
                </Link>
                <Link to="/rewards" className="hover:text-green-600">
                  Rewards
                </Link>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" className="block">
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;