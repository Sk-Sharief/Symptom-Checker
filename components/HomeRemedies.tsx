import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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

// Complete remedies database for all diseases
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
      },
      {
        title: 'Steam Inhalation',
        description: 'Inhale steam from hot water with eucalyptus oil for 5-10 minutes to clear nasal passages.',
        icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
        category: 'immediate'
      },
      {
        title: 'Rest and Hydration',
        description: 'Get plenty of sleep and drink warm liquids like herbal teas and broths.',
        icon: <Clock className="h-5 w-5 text-purple-600" />,
        category: 'daily'
      }
    ],
    warnings: ['Avoid cold foods and drinks', 'Do not suppress natural healing process'],
    whenToSeeDoctor: ['Fever above 101°F for more than 3 days', 'Severe headache', 'Difficulty breathing']
  },
  'migraine': {
    id: 'migraine',
    name: 'Migraine',
    description: 'A severe headache often accompanied by nausea and sensitivity to light.',
    remedies: [
      {
        title: 'Peppermint Oil',
        description: 'Apply diluted peppermint oil to temples and forehead. Massage gently for relief.',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        category: 'immediate'
      },
      {
        title: 'Cold Compress',
        description: 'Apply cold compress to head and neck for 15 minutes to reduce pain and inflammation.',
        icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
        category: 'immediate'
      },
      {
        title: 'Magnesium Supplement',
        description: 'Take 400-500mg magnesium daily to prevent migraines and reduce frequency.',
        icon: <Thermometer className="h-5 w-5 text-orange-600" />,
        category: 'daily'
      },
      {
        title: 'Dark Room Rest',
        description: 'Rest in a quiet, dark room to reduce light sensitivity and promote healing.',
        icon: <Clock className="h-5 w-5 text-purple-600" />,
        category: 'lifestyle'
      }
    ],
    warnings: ['Avoid bright lights and loud sounds', 'Stay hydrated'],
    whenToSeeDoctor: ['Sudden severe headache', 'Headache with fever and stiff neck', 'Changes in vision']
  },
  'gastritis': {
    id: 'gastritis',
    name: 'Gastritis',
    description: 'Inflammation of the stomach lining causing digestive discomfort.',
    remedies: [
      {
        title: 'Aloe Vera Juice',
        description: 'Drink 1/4 cup pure aloe vera juice before meals to soothe stomach lining.',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        category: 'dietary'
      },
      {
        title: 'Chamomile Tea',
        description: 'Drink chamomile tea 2-3 times daily to reduce inflammation and promote healing.',
        icon: <Thermometer className="h-5 w-5 text-orange-600" />,
        category: 'daily'
      },
      {
        title: 'Avoid Spicy Foods',
        description: 'Eliminate spicy, acidic, and processed foods. Eat bland, easily digestible meals.',
        icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
        category: 'lifestyle'
      },
      {
        title: 'Probiotics',
        description: 'Take probiotic supplements or eat yogurt to restore healthy gut bacteria.',
        icon: <Clock className="h-5 w-5 text-purple-600" />,
        category: 'daily'
      }
    ],
    warnings: ['Avoid alcohol and NSAIDs', 'Eat smaller, frequent meals'],
    whenToSeeDoctor: ['Blood in vomit or stool', 'Severe abdominal pain', 'Persistent nausea']
  },
  'arthritis': {
    id: 'arthritis',
    name: 'Arthritis',
    description: 'Inflammation of joints causing pain, swelling, and stiffness.',
    remedies: [
      {
        title: 'Turmeric Paste',
        description: 'Mix turmeric powder with warm oil, apply to affected joints for 20 minutes daily.',
        icon: <Thermometer className="h-5 w-5 text-orange-600" />,
        category: 'immediate'
      },
      {
        title: 'Warm Oil Massage',
        description: 'Massage joints with warm sesame or coconut oil to improve circulation and reduce stiffness.',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        category: 'daily'
      },
      {
        title: 'Ginger Supplement',
        description: 'Take 500mg ginger supplement twice daily to reduce inflammation naturally.',
        icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
        category: 'dietary'
      },
      {
        title: 'Gentle Exercise',
        description: 'Practice yoga or gentle stretching to maintain joint flexibility and strength.',
        icon: <Clock className="h-5 w-5 text-purple-600" />,
        category: 'lifestyle'
      }
    ],
    warnings: ['Avoid high-impact activities', 'Maintain healthy weight'],
    whenToSeeDoctor: ['Severe joint deformity', 'Inability to move joint', 'Signs of infection']
  },
  'anxiety-disorder': {
    id: 'anxiety-disorder',
    name: 'Anxiety Disorder',
    description: 'Mental health condition characterized by excessive worry and fear.',
    remedies: [
      {
        title: 'Ashwagandha',
        description: 'Take 300-500mg ashwagandha supplement daily to reduce stress and anxiety naturally.',
        icon: <Thermometer className="h-5 w-5 text-orange-600" />,
        category: 'daily'
      },
      {
        title: 'Deep Breathing',
        description: 'Practice 4-7-8 breathing technique: inhale 4, hold 7, exhale 8 counts.',
        icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
        category: 'immediate'
      },
      {
        title: 'Meditation',
        description: 'Practice 10-20 minutes of mindfulness meditation daily to calm the mind.',
        icon: <Clock className="h-5 w-5 text-purple-600" />,
        category: 'lifestyle'
      },
      {
        title: 'Herbal Tea',
        description: 'Drink passionflower or lemon balm tea in the evening to promote relaxation.',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        category: 'dietary'
      }
    ],
    warnings: ['Limit caffeine intake', 'Avoid alcohol as coping mechanism'],
    whenToSeeDoctor: ['Panic attacks', 'Suicidal thoughts', 'Inability to function daily']
  },
  'chronic-fatigue': {
    id: 'chronic-fatigue',
    name: 'Chronic Fatigue',
    description: 'Long-term condition causing extreme tiredness and weakness.',
    remedies: [
      {
        title: 'Coenzyme Q10',
        description: 'Take 100-200mg CoQ10 daily to boost cellular energy production.',
        icon: <Thermometer className="h-5 w-5 text-orange-600" />,
        category: 'daily'
      },
      {
        title: 'Pacing Activities',
        description: 'Break tasks into small segments with rest periods to conserve energy.',
        icon: <Clock className="h-5 w-5 text-purple-600" />,
        category: 'lifestyle'
      },
      {
        title: 'B-Complex Vitamins',
        description: 'Take high-quality B-complex supplement to support energy metabolism.',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        category: 'dietary'
      },
      {
        title: 'Gentle Movement',
        description: 'Practice very light yoga or tai chi to maintain circulation without overexertion.',
        icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
        category: 'immediate'
      }
    ],
    warnings: ['Avoid overexertion', 'Listen to your body'],
    whenToSeeDoctor: ['Worsening symptoms', 'New neurological symptoms', 'Severe depression']
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'immediate': return 'bg-red-100 text-red-800';
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'dietary': return 'bg-green-100 text-green-800';
      case 'lifestyle': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'immediate': return 'Immediate Relief';
      case 'daily': return 'Daily Care';
      case 'dietary': return 'Dietary';
      case 'lifestyle': return 'Lifestyle';
      default: return category;
    }
  };

  if (!diseaseInfo) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section with Ayurvedic Background */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://thumbs.dreamstime.com/b/artistic-ayurvedic-display-featuring-spices-roots-green-leaves-highlighting-natural-traditional-wellness-practices-rustic-352562794.jpg')`
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Natural Ayurvedic Remedies
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Discover time-tested natural healing methods rooted in ancient Ayurvedic wisdom
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/prediction')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Predictions
          </Button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Home Remedies for {diseaseInfo.name}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {diseaseInfo.description}
            </p>
          </div>

          {/* Medical Disclaimer */}
          <Alert className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Medical Disclaimer:</strong> These home remedies are for informational purposes only. 
              They are not a substitute for professional medical advice, diagnosis, or treatment. 
              Always consult your healthcare provider before trying new treatments.
            </AlertDescription>
          </Alert>

          {/* Home Remedies */}
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
                          <Badge className={getCategoryColor(remedy.category)}>
                            {getCategoryLabel(remedy.category)}
                          </Badge>
                        </div>
                        <p className="text-gray-700">{remedy.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Warnings */}
          {diseaseInfo.warnings.length > 0 && (
            <Card className="mb-8 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertTriangle className="h-5 w-5" />
                  Important Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {diseaseInfo.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2 text-orange-700">
                      <span className="text-orange-500 mt-1">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* When to See a Doctor */}
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                When to See a Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 mb-3">
                Seek immediate medical attention if you experience any of the following:
              </p>
              <ul className="space-y-2">
                {diseaseInfo.whenToSeeDoctor.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-2 text-red-700">
                    <span className="text-red-500 mt-1">•</span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/prediction')}
            >
              View Other Conditions
            </Button>
            <Button 
              onClick={() => navigate('/symptoms')}
            >
              Check New Symptoms
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}