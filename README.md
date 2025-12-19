# Performance Dashboard Demo

A real-time performance monitoring dashboard built with React, TypeScript, and Recharts. Features dynamic data updates and responsive charts displaying response times, error rates, and other key metrics.

## Features

- 📊 Interactive performance charts with multiple time ranges (1h, 6h, 24h, 7d, 30d)
- 🎨 Dark mode support
- 📈 Real-time data updates every 4 minutes
- 🔴 Visual indicators for baseline violations
- 📱 Responsive design with Tailwind CSS

## Prerequisites

- **Node.js** (v20 or higher)
- **PHP** (v8.x or higher)
- **npm** or **yarn**

### Installing PHP on Windows

1. Download PHP from https://windows.php.net/download/
   - Choose "VS17 x64 Thread Safe" ZIP file
2. Extract to `D:\php` (or `C:\php`)
3. Add to PATH (PowerShell as Admin):
   ```powershell
   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";D:\php", "Machine")
   ```
4. Restart your terminal and verify:
   ```powershell
   php -v
   ```

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:wjs4572/dashboard-demo-00.git
   cd dashboard-demo-00
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the PHP backend server** (Terminal 1)
   ```bash
   php -S localhost:8000 -t public
   ```
   Keep this terminal running.

4. **Start the Vite dev server** (Terminal 2 - new terminal)
   ```bash
   npm run dev
   ```
   Keep this terminal running.

5. **Open your browser**
   
   Navigate to http://localhost:3001 (or the port shown in terminal)

## How It Works

### Development Mode
- **Frontend**: Vite dev server on port 3001
- **Backend**: PHP server on port 8000 generates performance data
- **Proxy**: Vite proxies `/api` requests to PHP server
- **Data**: PHP generates fresh data every 4 minutes (cached)

### Production Mode
- **Build**: `npm run build` creates optimized static files in `dist/`
- **Backend**: PHP script on GoDaddy generates data dynamically
- **Deploy**: Upload `dist/` folder contents to `public_html/`

## Project Structure

```
├── public/
│   ├── api/
│   │   └── performance-data.php    # PHP backend (generates data)
│   ├── data/
│   │   └── performance-cache.json  # PHP cache file (auto-generated)
│   ├── images/                     # Logo and chart icons
│   └── .htaccess                   # Apache configuration
├── src/
│   ├── data/
│   │   ├── dataConfig.ts           # Baseline configuration
│   │   ├── dataService.ts          # API fetch service
│   │   └── trendsData.ts           # Utility functions
│   ├── pages/
│   │   └── home/
│   │       ├── page.tsx            # Main dashboard page
│   │       └── components/         # Dashboard components
│   └── router/                     # React Router configuration
└── vite.config.ts                  # Vite configuration with API proxy
```

## Available Scripts

- `npm run dev` - Start Vite dev server (requires PHP server running separately)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment to GoDaddy

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload files via FTP/cPanel File Manager**
   - Upload all files from `dist/` to `public_html/`
   - The `api/performance-data.php` will be included automatically
   - The `.htaccess` will be included automatically

3. **Create cache directory**
   - Create folder: `public_html/data/`
   - Set permissions to 755

4. **Test the deployment**
   - Visit your domain
   - Data will update automatically every 4 minutes

## Configuration

### Update Baselines

Edit [`src/data/dataConfig.ts`](src/data/dataConfig.ts):

```typescript
export const defaultConfig: ChartConfig = {
  responseTime: { baseline: 270, unit: 'ms' },
  errorRate: { baseline: 2.0, unit: '%' }
};
```

### Adjust Cache Duration

Edit [`public/api/performance-data.php`](public/api/performance-data.php):

```php
$CACHE_DURATION = 240; // 4 minutes in seconds
```

## Troubleshooting

### PHP server won't start
- Verify PHP is installed: `php -v`
- Check if port 8000 is available
- Make sure you're in the project root directory

### No data displaying
- Ensure PHP server is running on port 8000
- Check browser console (F12) for errors
- Verify Vite proxy is configured in `vite.config.ts`

### Slow loading
- Clear browser cache
- Restart both servers (PHP and Vite)
- Check network tab in DevTools

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Recharts** - Chart library
- **Tailwind CSS** - Styling
- **PHP** - Backend data generation
- **React Router** - Navigation

## License

MIT

## Author

William Simpson
