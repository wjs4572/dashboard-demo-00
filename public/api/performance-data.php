<?php
/**
 * Performance Data Generator API
 * Generates simulated performance metrics with 4-minute cache
 * Returns JSON data compatible with the dashboard frontend
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Configuration
$CACHE_FILE = __DIR__ . '/../data/performance-cache.json';
$CACHE_DURATION = 240; // 4 minutes in seconds
$RESPONSE_TIME_BASELINE = 270;
$ERROR_RATE_BASELINE = 2.0;

/**
 * Generate random number between min and max
 */
function randomBetween($min, $max) {
    return $min + mt_rand() / mt_getrandmax() * ($max - $min);
}

/**
 * Generate time series data for a specific window
 */
function generateTimeSeriesData($windowMinutes, $intervalMinutes, $metricType, $baseline) {
    // Get current time and round to nearest 5-minute mark
    $currentSeconds = time();
    $minutesRemainder = floor($currentSeconds / 60) % 5;
    $roundedSeconds = $currentSeconds - ($minutesRemainder * 60) - ($currentSeconds % 60);
    $now = $roundedSeconds * 1000; // Convert to milliseconds
    
    $data = [];
    $numPoints = floor($windowMinutes / $intervalMinutes);
    
    for ($i = 0; $i < $numPoints; $i++) {
        $timestamp = $now - ($numPoints - $i - 1) * $intervalMinutes * 60 * 1000;
        
        if ($metricType === 'responseTime') {
            // Generate response time with less variability
            $value = randomBetween($baseline * 0.85, $baseline * 1.05);
        } else {
            // Generate error rate with less variability
            $value = randomBetween($baseline * 0.90, $baseline * 1.10);
        }
        
        $data[] = [
            'timestamp' => $timestamp,
            'value' => round($value, 2),
            'baseline' => $baseline
        ];
    }
    
    return $data;
}

/**
 * Generate summary metric
 */
function generateSummaryMetric($current, $baseline, $unit) {
    $changePercent = (($current - $baseline) / $baseline) * 100;
    
    if (abs($changePercent) < 5) {
        $status = 'success';
    } elseif (abs($changePercent) < 15) {
        $status = 'warning';
    } else {
        $status = 'error';
    }
    
    return [
        'current' => round($current, 2),
        'baseline' => round($baseline, 2),
        'unit' => $unit,
        'status' => $status,
        'trend' => $current > $baseline ? 'up' : 'down',
        'changePercent' => round(abs($changePercent), 2)
    ];
}

/**
 * Generate complete performance data
 */
function generatePerformanceData($responseTimeBaseline, $errorRateBaseline) {
    // Generate time series for all windows
    $responseTime = [
        '1h' => generateTimeSeriesData(60, 5, 'responseTime', $responseTimeBaseline),
        '6h' => generateTimeSeriesData(360, 30, 'responseTime', $responseTimeBaseline),
        '24h' => generateTimeSeriesData(1440, 120, 'responseTime', $responseTimeBaseline),
        '7d' => generateTimeSeriesData(10080, 720, 'responseTime', $responseTimeBaseline),
        '30d' => generateTimeSeriesData(43200, 2880, 'responseTime', $responseTimeBaseline)
    ];
    
    $errorRate = [
        '1h' => generateTimeSeriesData(60, 5, 'errorRate', $errorRateBaseline),
        '6h' => generateTimeSeriesData(360, 30, 'errorRate', $errorRateBaseline),
        '24h' => generateTimeSeriesData(1440, 120, 'errorRate', $errorRateBaseline),
        '7d' => generateTimeSeriesData(10080, 720, 'errorRate', $errorRateBaseline),
        '30d' => generateTimeSeriesData(43200, 2880, 'errorRate', $errorRateBaseline)
    ];
    
    // Calculate averages from 1h data for accuracy
    $responseTimeValues = array_column($responseTime['1h'], 'value');
    $errorRateValues = array_column($errorRate['1h'], 'value');
    
    $currentResponseTime = count($responseTimeValues) > 0 ? array_sum($responseTimeValues) / count($responseTimeValues) : $responseTimeBaseline;
    $currentErrorRate = count($errorRateValues) > 0 ? array_sum($errorRateValues) / count($errorRateValues) : $errorRateBaseline;
    
    // Generate summary metrics
    $summaryMetrics = [
        'responseTime' => generateSummaryMetric($currentResponseTime, $responseTimeBaseline, 'ms'),
        'throughput' => generateSummaryMetric(randomBetween(980, 1020), 1000, 'req/s'),
        'errorRate' => generateSummaryMetric($currentErrorRate, $errorRateBaseline, '%'),
        'cpuUsage' => generateSummaryMetric(randomBetween(55, 75), 65, '%')
    ];
    
    return [
        'lastUpdated' => time() * 1000,
        'summaryMetrics' => $summaryMetrics,
        'responseTime' => $responseTime,
        'errorRate' => $errorRate
    ];
}

/**
 * Check if cache is valid
 */
function isCacheValid($cacheFile, $cacheDuration) {
    if (!file_exists($cacheFile)) {
        return false;
    }
    
    $fileTime = filemtime($cacheFile);
    $currentTime = time();
    
    return ($currentTime - $fileTime) < $cacheDuration;
}

/**
 * Main execution
 */
try {
    // Check if cache is valid
    if (isCacheValid($CACHE_FILE, $CACHE_DURATION)) {
        // Return cached data
        $cachedData = file_get_contents($CACHE_FILE);
        echo $cachedData;
    } else {
        // Generate new data
        $data = generatePerformanceData($RESPONSE_TIME_BASELINE, $ERROR_RATE_BASELINE);
        $jsonData = json_encode($data);
        
        // Ensure data directory exists
        $dataDir = dirname($CACHE_FILE);
        if (!is_dir($dataDir)) {
            mkdir($dataDir, 0755, true);
        }
        
        // Save to cache
        file_put_contents($CACHE_FILE, $jsonData);
        
        // Return new data
        echo $jsonData;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to generate performance data']);
}
?>
