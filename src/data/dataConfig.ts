// Configuration for baselines and data settings

export interface ChartConfig {
  responseTimeBaseline: number;
  errorRateBaseline: number;
}

export const defaultConfig: ChartConfig = {
  responseTimeBaseline: 270,
  errorRateBaseline: 2.0,
};

// Allow override per chart
export let chartConfig: ChartConfig = { ...defaultConfig };

export const updateChartConfig = (newConfig: Partial<ChartConfig>) => {
  chartConfig = { ...chartConfig, ...newConfig };
};

export const resetChartConfig = () => {
  chartConfig = { ...defaultConfig };
};
