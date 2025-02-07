import { barChartConfig, lineChartConfig, ScatterChartConfig } from "./config/chartsConfigurating";
import { chartRegistry } from "./config/registrationConfig";
import { renderChart } from "./helpers/chartRenderer";
import { DataLoader } from "./helpers/dataLoader";


// Load the data asynchronously and render the chart
DataLoader(barChartConfig.dataSetURL, 1000, (data: any[]) => {
    renderChart('barChart', data, chartRegistry);
});

