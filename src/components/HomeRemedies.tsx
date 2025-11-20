import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Thermometer } from 'lucide-react';
import Navigation from './Navigation';

interface Remedy {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: 'immediate' | 'daily' | 'dietary' | 'lifestyle';
}

interface DiseaseInfo {
  id: string;
  name: string;
  description: string;
  remedies: Remedy[];
  warnings: string[];
  whenToSeeDoctor: string[];
}

const remediesDatabase: { [key: string]: DiseaseInfo } = {
  'common-cold': {
    id: 'common-cold',
    name: 'Common Cold',
    description: 'A viral infection of the upper respiratory tract that typically resolves on its own within 7-10 days.',
    remedies: [
      {
        title: 'Ginger Tea',
        description: 'Steep fresh ginger slices in hot water for 10 minutes. Drink 2-3 times daily to reduce inflammation.',
        icon: <Thermometer className="h-5 w-5 text-orange-600" />,
        category: 'immediate'
      },
      {
        title: 'Honey and Turmeric',
        description: 'Mix 1 tsp honey with pinch of turmeric. Take twice daily to boost immunity and soothe throat.',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        category: 'dietary'
      }
    ],
    warnings: ['Avoid cold foods and drinks', 'Do not suppress natural healing process'],
    whenToSeeDoctor: ['Fever above 101°F for more than 3 days', 'Severe headache', 'Difficulty breathing']
  }
};

export default function HomeRemedies() {
  const navigate = useNavigate();
  const { diseaseId } = useParams<{ diseaseId: string }>();
  const [diseaseInfo, setDiseaseInfo] = useState<DiseaseInfo | null>(null);

  useEffect(() => {
    if (diseaseId && remediesDatabase[diseaseId]) {
      setDiseaseInfo(remediesDatabase[diseaseId]);
    } else {
      navigate('/prediction');
    }
  }, [diseaseId, navigate]);

  if (!diseaseInfo) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/prediction')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Predictions
          </Button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Home Remedies for {diseaseInfo.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {diseaseInfo.description}
            </p>
          </div>

          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Medical Disclaimer:</strong> These home remedies are for informational purposes only. 
              They are not a substitute for professional medical advice, diagnosis, or treatment. 
              Always consult your healthcare provider before trying new treatments.
            </AlertDescription>
          </Alert>

          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Recommended Ayurvedic Remedies</h3>
            <div className="grid gap-6">
              {diseaseInfo.remedies.map((remedy, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {remedy.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{remedy.title}</h4>
                          <Badge className="bg-green-100 text-green-800">{remedy.category}</Badge>
                        </div>
                        <p className="text-gray-700">{remedy.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
