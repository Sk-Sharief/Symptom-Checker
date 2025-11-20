import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import HomePage from './components/HomePage';
import SymptomInput from './components/SymptomInput';
import SymptomConfirmation from './components/SymptomConfirmation';
import DiseasePrediction from './components/DiseasePrediction';
import HomeRemedies from './components/HomeRemedies';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/symptoms" element={<SymptomInput />} />
          <Route path="/confirm" element={<SymptomConfirmation />} />
          <Route path="/prediction" element={<DiseasePrediction />} />
          <Route path="/remedies/:diseaseId" element={<HomeRemedies />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}