import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Shield, Users, Zap } from 'lucide-react';
import Navigation from './Navigation';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-800">About HealthPredict AI</Badge>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              Bridging Ancient Wisdom with Modern Technology
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We combine the time-tested principles of Ayurveda with cutting-edge AI to provide 
              personalized health insights and natural remedies for your wellbeing.
            </p>
          </div>

          <Card className="mb-12 border-none shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To make traditional Ayurvedic knowledge accessible to everyone through intelligent 
                  technology, empowering individuals to take control of their health naturally and safely.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
