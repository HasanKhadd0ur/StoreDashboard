import { ChartRegistry } from "../chartRegistry";
import { BarChart } from "../charts/barChart";
import { ContextVisChart } from "../charts/contexVisChart";
import { LineChart } from "../charts/lineChart";
import { PieChart } from "../charts/pieChart";
import { ScatterChart } from "../charts/scatterChart";
import { barChartConfig, lineChartConfig, pieChartConfig, ScatterChartConfig, YearbarChartConfig } from "./chartsConfigurating";

const chartRegistry = new ChartRegistry();



// Register chart types
chartRegistry.register('lineChart', LineChart,lineChartConfig);
chartRegistry.register('contextVisChart', ContextVisChart,lineChartConfig);
chartRegistry.register('scatterChart', ScatterChart,ScatterChartConfig);
chartRegistry.register('barChart', BarChart,barChartConfig);
chartRegistry.register('pieChart', PieChart,pieChartConfig);
chartRegistry.register('YearbarChart', BarChart,YearbarChartConfig);


export  { chartRegistry}; 
