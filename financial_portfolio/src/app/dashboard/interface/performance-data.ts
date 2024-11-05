
export interface PerformanceData {
  dates: string[];
  portfolioPerformance: number[];
  benchmarkPerformance: {
    [key: string]: number[];
  };
}

interface Portfolio {
  portfolioName: string;
  owner: string;
  lastUpdated: string;
  performanceData: PerformanceData;
}