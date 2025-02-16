import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { auth } from "@/integrations/firebase/config";
import { signOut } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-semibold text-gray-900">
              Blessed
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  <User className="h-5 w-5" />
                </Link>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">
                  About
                </Link>
                <Link to="/register">
                  <Button variant="outline">Register</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md"
                >
                  Profile
                </Link>
                <Button variant="outline" onClick={handleSignOut} className="w-full mt-2">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md"
                >
                  About
                </Link>
                <Link to="/register" className="block mt-2">
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </Link>
                <Link to="/login" className="block mt-2">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;