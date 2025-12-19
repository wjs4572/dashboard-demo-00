import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import PrimaryMetrics from './components/PrimaryMetrics';
import TrendsBaseline from './components/TrendsBaseline';
import DrillDownPanel from './components/DrillDownPanel';
import AlertsExceptions from './components/AlertsExceptions';
import ContextFactors from './components/ContextFactors';
import Footer from './components/Footer';
import AlertsPanel from './components/AlertsPanel';
import ErrorsPanel from './components/ErrorsPanel';

export default function Home() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [errorsOpen, setErrorsOpen] = useState(false);
  const [showErrorsInSection, setShowErrorsInSection] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const alertsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger fade-in after mount
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleOpenDrillDown = (event: CustomEvent) => {
      const { metric } = event.detail;
      setSelectedMetric(metric);
    };

    window.addEventListener('openDrillDown', handleOpenDrillDown as EventListener);
    
    return () => {
      window.removeEventListener('openDrillDown', handleOpenDrillDown as EventListener);
    };
  }, []);

  const handleMetricClick = (metricId: string) => {
    setSelectedMetric(selectedMetric === metricId ? null : metricId);
  };

  const handleCloseDrillDown = () => {
    setSelectedMetric(null);
  };

  const handleAlertsClick = () => {
    setShowErrorsInSection(false);
    if (alertsSectionRef.current) {
      alertsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleErrorsClick = () => {
    setShowErrorsInSection(true);
    if (alertsSectionRef.current) {
      alertsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleInvestigateFromAlert = (metricId: string) => {
    setSelectedMetric(metricId);
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 font-['Inter',sans-serif] transition-all duration-700 ease-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Header 
        onAlertsClick={handleAlertsClick}
        onErrorsClick={handleErrorsClick}
        alertsOpen={alertsOpen}
        errorsOpen={errorsOpen}
      />
      
      {alertsOpen && <AlertsPanel onClose={() => setAlertsOpen(false)} onInvestigate={handleInvestigateFromAlert} />}
      {errorsOpen && <ErrorsPanel onClose={() => setErrorsOpen(false)} />}
      
      <main className="max-w-[1400px] mx-auto px-8 py-8">
        <PrimaryMetrics onMetricClick={handleMetricClick} selectedMetric={selectedMetric} />
        
        {selectedMetric && (
          <div className="mb-8">
            <DrillDownPanel metricId={selectedMetric} onClose={handleCloseDrillDown} />
          </div>
        )}
        
        <TrendsBaseline />
        
        <div ref={alertsSectionRef}>
          <AlertsExceptions showErrors={showErrorsInSection} />
        </div>
        
        <ContextFactors />
      </main>
      
      <Footer />
    </div>
  );
}
