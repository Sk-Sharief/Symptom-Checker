import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, Zap } from 'lucide-react';
import Navigation from './Navigation';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
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

          {/* Mission Statement */}
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

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Zap className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
                <p className="text-gray-600">
                  Advanced machine learning algorithms trained on extensive Ayurvedic texts and modern medical research.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Safe & Natural</h3>
                <p className="text-gray-600">
                  All recommendations focus on natural, time-tested remedies with minimal side effects.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-10 w-10 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Personalized Care</h3>
                <p className="text-gray-600">
                  Tailored recommendations based on your unique constitution and symptoms.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* What is Ayurveda */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">What is Ayurveda?</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Ayurveda is a 5,000-year-old system of natural healing that originated in India. 
                    It emphasizes the importance of balance between mind, body, and consciousness to maintain health.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Unlike modern medicine that often treats symptoms, Ayurveda focuses on identifying 
                    and treating the root cause of illness through natural methods.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our AI system has been trained on classical Ayurvedic texts and modern research 
                    to provide you with authentic, safe, and effective natural remedies.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Core Principles</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span>Prevention is better than cure</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span>Treatment of root causes, not just symptoms</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span>Natural remedies with minimal side effects</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span>Personalized treatment for each individual</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Notice</h3>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    Our AI-powered recommendations are for educational and informational purposes only. 
                    While based on traditional Ayurvedic principles, they should not replace professional 
                    medical advice, diagnosis, or treatment. Always consult with qualified healthcare 
                    providers for serious health concerns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}