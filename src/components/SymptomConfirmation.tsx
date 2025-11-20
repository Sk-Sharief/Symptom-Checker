import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const getCoOccurringSymptoms = (symptoms: string[]): string[] => {
  const symptomMap: { [key: string]: string[] } = {
    fever: ['chills', 'sweating', 'body aches', 'fatigue'],
    cough: ['sore throat', 'runny nose', 'chest congestion', 'shortness of breath'],
    headache: ['dizziness', 'nausea', 'sensitivity to light', 'neck stiffness'],
    nausea: ['vomiting', 'stomach pain', 'loss of appetite', 'dizziness'],
    'sore throat': ['difficulty swallowing', 'hoarse voice', 'swollen glands'],
    fatigue: ['weakness', 'drowsiness', 'difficulty concentrating'],
  };

  const coOccurring = new Set<string>();
  symptoms.forEach(symptom => {
    const related = symptomMap[symptom.toLowerCase()];
    if (related) {
      related.forEach(r => {
        if (!symptoms.includes(r)) {
          coOccurring.add(r);
        }
      });
    }
  });

  return Array.from(coOccurring).slice(0, 8);
};

export default function SymptomConfirmation() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [coOccurringSymptoms, setCoOccurringSymptoms] = useState<string[]>([]);
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);

  useEffect(() => {
    const storedSymptoms = localStorage.getItem('userSymptoms');
    if (storedSymptoms) {
      const parsedSymptoms = JSON.parse(storedSymptoms);
      setSymptoms(parsedSymptoms);
      setCoOccurringSymptoms(getCoOccurringSymptoms(parsedSymptoms));
    } else {
      navigate('/symptoms');
    }
  }, [navigate]);

  const handleAdditionalSymptomToggle = (symptom: string) => {
    setSelectedAdditional(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = () => {
    const finalSymptoms = [...symptoms, ...selectedAdditional];
    localStorage.setItem('finalSymptoms', JSON.stringify(finalSymptoms));
    navigate('/prediction');
  };

  const removeSymptom = (symptom: string) => {
    const updatedSymptoms = symptoms.filter(s => s !== symptom);
    setSymptoms(updatedSymptoms);
    setCoOccurringSymptoms(getCoOccurringSymptoms(updatedSymptoms));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/symptoms')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Symptoms
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Confirm Your Symptoms</CardTitle>
              <p className="text-center text-gray-600">
                Review your symptoms and add any additional ones that commonly occur together.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Your Current Symptoms:</h3>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom, index) => (
                    <Badge key={index} variant="default" className="px-3 py-1">
                      {symptom}
                      <button
                        onClick={() => removeSymptom(symptom)}
                        className="ml-2 hover:text-red-200"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {coOccurringSymptoms.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">
                    Common Co-occurring Symptoms:
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Select any additional symptoms you're experiencing:
                  </p>
                  <div className="space-y-3">
                    {coOccurringSymptoms.map((symptom) => (
                      <div key={symptom} className="flex items-center space-x-2">
                        <Checkbox
                          id={symptom}
                          checked={selectedAdditional.includes(symptom)}
                          onCheckedChange={() => handleAdditionalSymptomToggle(symptom)}
                        />
                        <label 
                          htmlFor={symptom} 
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize cursor-pointer"
                        >
                          {symptom}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedAdditional.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Additional Symptoms Selected:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAdditional.map((symptom, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button 
                  onClick={handleSubmit}
                  className="w-full"
                  size="lg"
                >
                  Get Disease Predictions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
