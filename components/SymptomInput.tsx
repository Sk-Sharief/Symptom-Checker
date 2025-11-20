import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, X, Leaf } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from './Navigation';

export default function SymptomInput() {
  const navigate = useNavigate();
  const [symptomInput, setSymptomInput] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);

  // Mock Ayurvedic symptoms for now - ready for API integration later
  const ayurvedicSymptoms = [
    'headache', 'fever', 'cough', 'nausea', 'fatigue', 'joint pain',
    'digestive issues', 'insomnia', 'stress', 'anxiety', 'back pain', 
    'skin problems', 'respiratory issues', 'constipation', 'acidity', 'bloating'
  ];

  const addSymptom = () => {
    if (symptomInput.trim()) {
      const newSymptoms = symptomInput
        .split(',')
        .map(s => s.trim())
        .filter(s => s && !symptoms.includes(s));
      
      if (newSymptoms.length > 0) {
        setSymptoms([...symptoms, ...newSymptoms]);
        setSymptomInput('');
      }
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleAnalyze = () => {
    if (symptoms.length === 0) {
      toast.error('Please add at least one symptom');
      return;
    }
    
    // Store symptoms in localStorage for the next page
    localStorage.setItem('userSymptoms', JSON.stringify(symptoms));
    navigate('/confirm');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSymptom();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation />
      
      {/* Hero Section with Ayurvedic Background */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://us.123rf.com/450wm/ninafedorova/ninafedorova1701/ninafedorova170100075/69325588-hand-drawn-round-ayurveda-background-ayurveda-healthcare-and-treatment-concept-for-your-design.jpg')`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Ayurvedic Symptom Analysis
            </h1>
            <p className="text-xl text-gray-200">
              Traditional healing wisdom meets modern technology
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur">
            <CardHeader className="text-center pb-8">
              <div className="bg-gradient-to-br from-green-500 to-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl text-gray-900 mb-4">What are you feeling?</CardTitle>
              <p className="text-gray-600 leading-relaxed">
                Please describe your symptoms in detail. Our Ayurvedic AI will analyze them 
                according to traditional principles to provide personalized natural remedies.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Input Section */}
              <div className="flex gap-3">
                <Input
                  placeholder="e.g., headache, fatigue, digestive issues, joint pain"
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-12 text-base"
                />
                <Button onClick={addSymptom} size="lg" className="px-6">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>

              {/* Added Symptoms */}
              {symptoms.length > 0 && (
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="font-semibold mb-4 text-green-800 flex items-center">
                    <Leaf className="h-4 w-4 mr-2" />
                    Your Symptoms ({symptoms.length})
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {symptoms.map((symptom, index) => (
                      <Badge key={index} variant="secondary" className="px-4 py-2 text-sm bg-white">
                        {symptom}
                        <button
                          onClick={() => removeSymptom(symptom)}
                          className="ml-2 hover:text-red-500 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Ayurvedic Symptom Categories */}
              <div>
                <h3 className="font-semibold mb-4 text-gray-800">Common Ayurvedic Symptoms (click to add):</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ayurvedicSymptoms.map((symptom) => (
                    <Badge
                      key={symptom}
                      variant="outline"
                      className="cursor-pointer hover:bg-green-100 hover:border-green-300 hover:text-green-700 transition-all p-3 justify-center text-center"
                      onClick={() => {
                        if (!symptoms.includes(symptom)) {
                          setSymptoms([...symptoms, symptom]);
                        }
                      }}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <div className="pt-6">
                <Button 
                  onClick={handleAnalyze}
                  className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  disabled={symptoms.length === 0}
                >
                  <Leaf className="mr-2 h-5 w-5" />
                  Get Ayurvedic Analysis
                </Button>
              </div>

              <p className="text-sm text-gray-500 text-center leading-relaxed">
                💡 <strong>Tip:</strong> Be as specific as possible about your symptoms. 
                Include timing, intensity, and any patterns you've noticed for better analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}