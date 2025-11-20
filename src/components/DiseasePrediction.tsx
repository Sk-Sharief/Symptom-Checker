import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { ArrowLeft, Shield, Activity } from 'lucide-react';
import Navigation from './Navigation';

interface Disease {
  id: string;
  diseaseName: string;
  scientificName?: string;
  probability: number;
  description?: string;
  severityLevel?: number;
}

const mockDiseases = [
  {
    id: 'common-cold',
    diseaseName: 'Common Cold',
    scientificName: 'Viral Upper Respiratory Infection',
    description: 'A viral infection of the upper respiratory tract affecting nose and throat',
    severityLevel: 2,
    symptoms: ['cough', 'runny nose', 'sore throat', 'sneezing', 'congestion', 'mild fever', 'fatigue']
  },
  {
    id: 'migraine',
    diseaseName: 'Migraine',
    scientificName: 'Migraine Headache',
    description: 'A severe headache often accompanied by nausea and sensitivity to light',
    severityLevel: 4,
    symptoms: ['headache', 'nausea', 'sensitivity to light', 'dizziness', 'vomiting']
  },
  {
    id: 'gastritis',
    diseaseName: 'Gastritis',
    scientificName: 'Gastritis',
    description: 'Inflammation of the stomach lining causing digestive discomfort',
    severityLevel: 3,
    symptoms: ['digestive issues', 'stomach pain', 'nausea', 'bloating', 'acidity', 'loss of appetite']
  },
  {
    id: 'arthritis',
    diseaseName: 'Arthritis',
    scientificName: 'Joint Inflammation',
    description: 'Inflammation of joints causing pain, swelling, and stiffness',
    severityLevel: 4,
    symptoms: ['joint pain', 'stiffness', 'swelling', 'back pain', 'muscle pain']
  }
];

export default function DiseasePrediction() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);

  const predictDiseases = (userSymptoms: string[]): Disease[] => {
    const symptomKeywords = userSymptoms.map(s => s.toLowerCase().trim());
    const diseaseMatches = mockDiseases.map(disease => {
      let matchScore = 0;
      let matchedSymptoms = 0;
      symptomKeywords.forEach(userSymptom => {
        (disease as any).symptoms.forEach((diseaseSymptom: string) => {
          if (userSymptom === diseaseSymptom.toLowerCase()) {
            matchScore += 30;
            matchedSymptoms++;
          } else if (userSymptom.includes(diseaseSymptom.toLowerCase()) || diseaseSymptom.toLowerCase().includes(userSymptom)) {
            matchScore += 15;
            matchedSymptoms++;
          }
        });
      });
      if (matchedSymptoms > 1) {
        matchScore += matchedSymptoms * 10;
      }
      if (matchScore > 10) {
        const probability = Math.min(matchScore, 95);
        return {
          id: disease.id,
          diseaseName: disease.diseaseName,
          scientificName: (disease as any).scientificName,
          probability,
          description: (disease as any).description,
          severityLevel: (disease as any).severityLevel
        } as Disease;
      }
      return null;
    }).filter(Boolean) as Disease[];
    return diseaseMatches
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 6);
  };

  useEffect(() => {
    const loadPredictions = async () => {
      const storedSymptoms = localStorage.getItem('finalSymptoms');
      if (storedSymptoms) {
        const parsedSymptoms = JSON.parse(storedSymptoms);
        setSymptoms(parsedSymptoms);
        try {
          setTimeout(() => {
            const results = predictDiseases(parsedSymptoms);
            setPredictions(results);
            setLoading(false);
          }, 2000);
        } catch (error) {
          console.error('Failed to generate predictions:', error);
          setLoading(false);
        }
      } else {
        navigate('/symptoms');
      }
    };
    loadPredictions();
  }, [navigate]);

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-red-600';
    if (probability >= 60) return 'text-orange-600';
    if (probability >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleViewRemedies = (diseaseId: string) => {
    navigate(`/remedies/${diseaseId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Activity className="h-12 w-12 text-blue-600 mx-auto animate-pulse" />
                <h3 className="text-lg font-medium">Analyzing Your Symptoms</h3>
                <p className="text-sm text-gray-600">
                  Our AI is processing your symptoms using Ayurvedic principles...
                </p>
                <Progress value={75} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Your Potential Diagnoses</h1>
            <p className="text-gray-600 mb-4">
              Based on the symptoms you provided, here are potential conditions from our Ayurvedic knowledge base. 
              For detailed information and home remedies, click on a disease name.
            </p>
            <div className="mb-6">
              <h3 className="font-medium mb-2">Analyzed Symptoms:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {symptoms.map((symptom, index) => (
                  <Badge key={index} variant="outline">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Alert className="mb-8">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> These predictions are for informational purposes only and should not 
              replace professional medical advice. Please consult with a healthcare provider for proper diagnosis and treatment.
            </AlertDescription>
          </Alert>

          {predictions.length > 0 ? (
            <div className="grid gap-6">
              {predictions.map((disease, index) => (
                <Card key={disease.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">
                          {disease.diseaseName}
                        </CardTitle>
                        {disease.scientificName && (
                          <p className="text-sm text-gray-600 italic">
                            {disease.scientificName}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getProbabilityColor(disease.probability)}`}>
                          {disease.probability}%
                        </div>
                        <p className="text-xs text-gray-500">Match</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {disease.description && (
                      <p className="text-gray-700 mb-4">{disease.description}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <Progress 
                        value={disease.probability} 
                        className="flex-1 mr-4" 
                      />
                      <Button 
                        onClick={() => handleViewRemedies(disease.id)}
                        variant="outline"
                      >
                        Get Home Remedies
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center p-8">
              <CardContent>
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Matching Conditions Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any conditions that closely match your symptoms. 
                  Please try being more specific or consult with a healthcare provider.
                </p>
                <Button onClick={() => navigate('/symptoms')}>
                  Try Different Symptoms
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="text-center mt-8 space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/symptoms')}
            >
              Check Different Symptoms
            </Button>
            <Button 
              onClick={() => navigate('/')}
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
