
import { useState } from 'react';
import Header from './components/Header';
import PrimaryMetrics from './components/PrimaryMetrics';
import TrendsBaseline from './components/TrendsBaseline';
import DrillDownPanel from './components/DrillDownPanel';
import AlertsExceptions from './components/AlertsExceptions';
import ContextFactors from './components/ContextFactors';
import Footer from './components/Footer';

export default function Home() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const handleMetricClick = (metricId: string) => {
    setSelectedMetric(selectedMetric === metricId ? null : metricId);
  };

  const handleCloseDrillDown = () => {
    setSelectedMetric(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <Header />
      
      <main className="max-w-[1400px] mx-auto px-8 py-8">
        <PrimaryMetrics onMetricClick={handleMetricClick} selectedMetric={selectedMetric} />
        
        <TrendsBaseline />
        
        {selectedMetric && (
          <DrillDownPanel metricId={selectedMetric} onClose={handleCloseDrillDown} />
        )}
        
        <AlertsExceptions />
        
        <ContextFactors />
      </main>
      
      <Footer />
    </div>
  );
}
