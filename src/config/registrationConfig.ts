import { ChartRegistry } from "../chartRegistry";
import { LineChart } from "../charts/lineChart";
import { ScatterChart } from "../charts/scatterChart";
import { lineChartConfig, ScatterChartConfig } from "./chartsConfigurating";

const chartRegistry = new ChartRegistry();



// Register chart types
chartRegistry.register('lineChart', LineChart,lineChartConfig);
chartRegistry.register('scatterChart', ScatterChart,ScatterChartConfig);

export  { chartRegistry}; 
