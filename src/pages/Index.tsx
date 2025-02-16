import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowRight, Users, Globe, Calendar, Plane, Utensils, Car, Bus, LeafyGreen, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="w-full pt-64 pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <Plane className="h-24 w-24" style={{ color: '#55883B' }} />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-12 animate-fade-down">
            Travel Sustainably,{" "}
            <span style={{ color: '#55883B' }}>Earn Rewards</span>
          </h1>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto animate-fade-up">
            Track your carbon footprint, discover eco-friendly restaurants, and earn points for sustainable choices.
          </p>
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-2/3 mx-auto group" style={{ backgroundColor: '#55883B' }} >
              Start Your Sustainable Journey
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll opacity-0">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                At Blessed, we believe in making sustainable travel accessible and rewarding. Our platform combines cutting-edge technology with environmental consciousness to help travelers make eco-friendly choices while exploring the world.
              </p>
              <p className="text-lg text-gray-600">
                Founded in 2023, we've helped thousands of travelers reduce their carbon footprint and discover sustainable alternatives for their journeys.
              </p>
            </div>
            <div className="animate-on-scroll opacity-0">
              <img 
                src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1" 
                alt="Nature view"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Score Section */}
      <section className="w-full py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll opacity-0 text-center mb-16">
            <BarChart className="h-16 w-16 mx-auto mb-4" style={{ color: '#66A348' }} />
            <h2 className="text-3xl font-bold mb-4">Your Sustainability Dashboard</h2>
            <p className="text-xl text-gray-600">Track your environmental impact and watch your score grow</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-on-scroll opacity-0 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center mb-4">
                <Car className="h-6 w-6" style={{ color: '#66A348' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transport Tracking</h3>
              <p className="text-gray-600">
                Log your transportation choices. Take a photo when using public transit to earn extra points!
              </p>
            </div>

            <div className="animate-on-scroll opacity-0 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center mb-4">
                <Utensils className="h-6 w-6" style={{ color: '#66A348' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Restaurant Rewards</h3>
              <p className="text-gray-600">
                Dine at our partner eco-friendly restaurants and earn points with every sustainable meal.
              </p>
            </div>

            <div className="animate-on-scroll opacity-0 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-lg flex items-center justify-center mb-4">
                <LeafyGreen className="h-6 w-6" style={{ color: '#66A348' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Weekly Impact</h3>
              <p className="text-gray-600">
                View detailed statistics of your environmental impact and sustainability achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Tracking Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll opacity-0">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8F5E9] mb-4">
                <Globe className="h-8 w-8" style={{ color: '#55883B' }} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Interactive Mapping System</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our state-of-the-art mapping system helps you:
              </p>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-2" style={{ color: '#55883B' }} />
                  Discover eco-friendly restaurants and businesses nearby
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-2" style={{ color: '#55883B' }} />
                  Track your sustainable travel routes
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-5 w-5 mr-2" style={{ color: '#55883B' }} />
                  Find the most efficient public transport options
                </li>
              </ul>
            </div>
            <div className="animate-on-scroll opacity-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
                  alt="Map interface"
                  className="rounded-lg shadow-xl border-4 border-[#55883B]/20"
                />
                <div className="absolute inset-0 rounded-lg shadow-[inset_0_2px_6px_rgba(0,0,0,0.1)]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 relative">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">
              Join the Sustainable Travel Movement
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Start earning rewards for your eco-friendly choices today.
            </p>
            <Link to="/register">
                <Button size="lg" className="w-full sm:w-2/3 mx-auto group" style={{ backgroundColor: '#55883B' }}>
                  Get Started Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 bg-[#55883B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>Our Story</li>
                <li>Team</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Partners</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p>&copy; 2024 Blessed. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
