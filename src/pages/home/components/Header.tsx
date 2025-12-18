
import { useState, useEffect } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-4">
            <img 
              src="https://static.readdy.ai/image/9e99d7141ea7221ac1fbc067090ea47d/63e704eefabd0cff9853bf1bfbe64769.png" 
              alt="SimpsonConcepts Logo" 
              className="h-auto w-[130px] md:w-[162px] mr-[8px]"
            />
            <div className="flex items-center gap-3 ml-[6px] md:gap-6">
              <div className="h-8 w-px bg-gray-300"></div>
              <h1 className="text-lg md:text-xl font-semibold text-[#07285b] leading-tight">Performance Dashboard</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">{formatDateTime(currentTime)}</div>
            <button className="px-4 py-2 text-sm font-medium text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
              Refresh Data
            </button>
            <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <i className="ri-settings-3-line text-xl text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
