import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">About Blessed</h1>
      
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At Blessed, we're committed to making sustainable travel accessible and rewarding. 
              Our platform combines cutting-edge technology with environmental consciousness to help 
              travelers make eco-friendly choices while exploring the world.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>Track your carbon footprint from various modes of transportation</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>Discover eco-friendly restaurants and earn rewards for sustainable choices</span>
              </li>
              <li className="flex items-start">
                <span className="font-medium mr-2">•</span>
                <span>Connect with like-minded travelers and share sustainable travel tips</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              Have questions or suggestions? We'd love to hear from you! 
              Reach out to us at support@blessed.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 