import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowRight, Users, Globe, Calendar, Plane, Utensils, Car, Bus, LeafyGreen, BarChart, Star, TrendingUp, Shield, Zap, MapPin, Target, Award, Sparkles } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-transparent to-blue-400/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-8 animate-fade-up border border-emerald-200">
            <Sparkles className="h-4 w-4" />
            Join 10,000+ Sustainable Travelers
          </div>
          
          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Travel Sustainably,{" "}
            <span className="text-black font-bold relative z-10">
              Earn Rewards
            </span>
          </h1>
          
          {/* Subheading */}
          <p className={`text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Track your carbon footprint, discover eco-friendly restaurants, and earn points for every sustainable choice you make.
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button size="lg" className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-700 transition-all duration-300">
              <Globe className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">50K+</div>
              <div className="text-gray-700">Trips Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.5M</div>
              <div className="text-gray-700">CO₂ Saved (kg)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">$125K</div>
              <div className="text-gray-700">Rewards Earned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="animate-on-scroll opacity-0">
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                <Target className="h-4 w-4 mr-2" />
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Everything You Need to{" "}
                <span className="text-black font-bold relative z-10">
                  Travel Sustainably
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Our comprehensive platform provides all the tools you need to make eco-friendly travel choices and track your impact.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="animate-on-scroll opacity-0 group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Smart Transport Tracking</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Automatically track your transportation choices and earn points for sustainable options like public transit, cycling, and carpooling.
                </p>
                <div className="flex items-center text-emerald-600 font-medium">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Track & Earn
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll opacity-0 group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Eco-Friendly Dining</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Discover and dine at certified sustainable restaurants. Earn bonus points for choosing local, organic, and environmentally conscious establishments.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <MapPin className="h-4 w-4 mr-2" />
                  Discover & Dine
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll opacity-0 group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Impact Analytics</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Get detailed insights into your carbon footprint reduction, sustainability score, and environmental impact with beautiful visualizations.
                </p>
                <div className="flex items-center text-purple-600 font-medium">
                  <BarChart className="h-4 w-4 mr-2" />
                  Analyze & Improve
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="animate-on-scroll opacity-0">
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Start Making a{" "}
                <span className="text-black font-bold relative z-10">
                  Difference Today
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Getting started with sustainable travel is simple. Follow these three easy steps to begin your journey.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="animate-on-scroll opacity-0 text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <ArrowRight className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Sign Up & Connect</h3>
              <p className="text-gray-700 leading-relaxed">
                Create your account and connect your transportation apps to automatically track your eco-friendly choices.
              </p>
            </div>

            <div className="animate-on-scroll opacity-0 text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                  <ArrowRight className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Track & Earn</h3>
              <p className="text-gray-700 leading-relaxed">
                Every sustainable choice you make automatically earns you points. Use public transport, dine at eco-friendly restaurants, and more.
              </p>
            </div>

            <div className="animate-on-scroll opacity-0 text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Redeem Rewards</h3>
              <p className="text-gray-700 leading-relaxed">
                Use your earned points to get discounts at partner businesses, book eco-friendly accommodations, or donate to environmental causes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="animate-on-scroll opacity-0">
              <Badge variant="secondary" className="mb-4 px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Loved by{" "}
                <span className="text-black font-bold relative z-10">
                  Travelers Worldwide
                </span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                See what our community has to say about their sustainable travel journey.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="animate-on-scroll opacity-0 group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "This app completely changed how I think about travel. I've reduced my carbon footprint by 40% and earned amazing rewards!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    S
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Chen</div>
                    <div className="text-sm text-gray-600">Digital Nomad</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll opacity-0 group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "The restaurant recommendations are incredible. I've discovered so many amazing eco-friendly places I never knew existed."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    M
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Michael Rodriguez</div>
                    <div className="text-sm text-gray-600">Food Blogger</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll opacity-0 group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "As a business traveler, this app helps me make sustainable choices even on tight schedules. The tracking is seamless."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    E
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Emma Thompson</div>
                    <div className="text-sm text-gray-600">Business Executive</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-on-scroll opacity-0">
            <Badge variant="secondary" className="mb-6 px-4 py-2 bg-white/20 text-white border-white/30">
              <Award className="h-4 w-4 mr-2" />
              Ready to Start?
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Join the Sustainable Travel{" "}
              <span className="text-yellow-300">Revolution</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Start your journey towards sustainable travel today and make a positive impact on our planet while earning amazing rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="group bg-white text-emerald-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300">
                <Globe className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">TravelAI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Making sustainable travel accessible and rewarding for everyone. Join thousands of travelers making a positive impact on our planet.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">in</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-semibold">ig</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Features</li>
                <li className="hover:text-white transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-white transition-colors cursor-pointer">API</li>
                <li className="hover:text-white transition-colors cursor-pointer">Integrations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2024 TravelAI. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made with ❤️ for the planet</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
