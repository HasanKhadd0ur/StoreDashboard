import { ChartRegistry } from "../chartRegistry";
import { BarChart } from "../charts/barChart";
import { LineChart } from "../charts/lineChart";
import { ScatterChart } from "../charts/scatterChart";
import { barChartConfig, lineChartConfig, ScatterChartConfig } from "./chartsConfigurating";

const chartRegistry = new ChartRegistry();



// Register chart types
chartRegistry.register('lineChart', LineChart,lineChartConfig);
chartRegistry.register('scatterChart', ScatterChart,ScatterChartConfig);
chartRegistry.register('barChart', BarChart,barChartConfig);

export  { chartRegistry}; 
