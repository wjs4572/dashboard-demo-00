import { useState, useEffect } from 'react';

interface HeaderProps {
  onAlertsClick: () => void;
  onErrorsClick: () => void;
  alertsOpen: boolean;
  errorsOpen: boolean;
}

export default function Header({ onAlertsClick, onErrorsClick, alertsOpen, errorsOpen }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.settings-dropdown')) {
        setSettingsOpen(false);
      }
    };

    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsOpen]);

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-4">
            <img 
              src="/images/logo_information_visualization.png" 
              alt="SimpsonConcepts Logo" 
              className="h-auto w-[130px] md:w-[162px] mr-[8px] dark:hidden"
            />
            <img 
              src="/images/logo_information_visualization_dark.png" 
              alt="SimpsonConcepts Logo" 
              className="h-auto w-[130px] md:w-[162px] mr-[8px] hidden dark:block"
            />
            <div className="flex items-center gap-3 ml-[6px] md:gap-6">
              <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-lg md:text-xl font-semibold text-[#07285b] dark:text-white leading-tight">Performance Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600 dark:text-gray-300">{formatDateTime(currentTime)}</div>
            
            <button 
              onClick={onAlertsClick}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                alertsOpen ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
              }`}
            >
              <i className="ri-alert-line text-base"></i>
              <span>Alerts</span>
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">2</span>
            </button>
            
            <button 
              onClick={onErrorsClick}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                errorsOpen ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30'
              }`}
            >
              <i className="ri-error-warning-line text-base"></i>
              <span>Errors</span>
              <span className="bg-[#CC2936] text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            </button>
            
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 text-sm font-medium text-[#2563EB] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Refresh Data
            </button>
            <div className="relative settings-dropdown">
              <button 
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-settings-3-line text-xl text-gray-600 dark:text-gray-300"></i>
              </button>
              
              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Display Settings
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className={`${darkMode ? 'ri-moon-line' : 'ri-sun-line'} text-lg text-gray-700 dark:text-gray-300`}></i>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {darkMode ? 'Dark Mode' : 'Light Mode'}
                      </span>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'} relative`}>
                      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}