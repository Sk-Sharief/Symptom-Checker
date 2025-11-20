import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Activity, Shield, Stethoscope, Leaf, Heart, Sparkles } from 'lucide-react';
import Navigation from './Navigation';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.indicure.com/assets/img/new/Ayurveda%20Treatment/Ayurveda-Treatment-main-banner.webp')`
        }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-green-100/20 text-green-200 border-green-300/30 backdrop-blur-sm text-sm px-4 py-2">
              🌿 Ancient Wisdom Meets Modern AI
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Your Health, <span className="text-green-400">Simplified</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Get quick, data-driven insights from your symptoms using our advanced AI 
              technology. Empower yourself with information to have more informed conversations 
              with healthcare providers.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white border-0"
              onClick={() => navigate('/symptoms')}
            >
              Check Your Symptoms →
            </Button>
          </div>
        </div>
      </div>

      {/* Rest of the content with original background */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur">
                <CardContent className="pt-8 text-center">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Leaf className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-900">Ayurvedic Intelligence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Advanced AI trained on 5,000 years of Ayurvedic knowledge and modern medical research 
                    to provide authentic natural healing recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur">
                <CardContent className="pt-8 text-center">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-900">Holistic Wellness</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get comprehensive health insights that address mind, body, and spirit balance 
                    through personalized constitutional analysis and lifestyle recommendations.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur">
                <CardContent className="pt-8 text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-900">Safe & Natural</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All remedies focus on natural herbs, dietary changes, and lifestyle modifications 
                    with minimal side effects and maximum healing potential.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* How It Works Section */}
            <div className="bg-white/50 backdrop-blur rounded-3xl p-12 mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                How Our Ayurvedic AI Works
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-700">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Symptom Analysis</h3>
                  <p className="text-sm text-gray-600">Enter your symptoms and health concerns</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-700">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">AI Processing</h3>
                  <p className="text-sm text-gray-600">Our AI analyzes using Ayurvedic principles</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-700">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Personalized Results</h3>
                  <p className="text-sm text-gray-600">Get tailored health insights and predictions</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-orange-700">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Natural Remedies</h3>
                  <p className="text-sm text-gray-600">Receive authentic Ayurvedic treatments</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Ready to Discover Your Natural Path to Wellness?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands who have found natural healing through our AI-powered Ayurvedic insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  onClick={() => navigate('/symptoms')}
                >
                  <Stethoscope className="mr-2 h-5 w-5" />
                  Start Health Analysis
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-3"
                  onClick={() => navigate('/about')}
                >
                  Learn About Ayurveda
                </Button>
              </div>
            </div>

            {/* Disclaimer */}
            <Alert className="max-w-4xl mx-auto bg-amber-50 border-amber-200">
              <Shield className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Important Medical Disclaimer:</strong> This application provides educational information 
                based on traditional Ayurvedic principles and is not intended to replace professional medical 
                advice, diagnosis, or treatment. Always consult with qualified healthcare providers for 
                serious health concerns and before making significant changes to your health regimen.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
