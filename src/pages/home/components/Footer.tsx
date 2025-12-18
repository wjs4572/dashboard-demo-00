
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-[1400px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span>© 2024 SimpsonConcepts. All rights reserved.</span>
            <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline cursor-pointer whitespace-nowrap">
              Website Builder
            </a>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Data refreshed every 30 seconds</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#085665] animate-pulse"></div>
              <span className="text-[#085665] font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
