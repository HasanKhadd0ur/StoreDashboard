import { lineChartConfig } from "./config/chartsConfigurating";
import { chartRegistry } from "./config/registrationConfig";
import { renderChart } from "./helpers/chartRenderer";
import { DataLoader } from "./helpers/dataLoader";


// Load the data asynchronously and render the chart
DataLoader(lineChartConfig.dataSetURL, 1000, (data: any[]) => {
    renderChart('lineChart', data, chartRegistry);
});

