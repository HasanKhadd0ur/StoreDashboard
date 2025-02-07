import { ChartRegistry } from "../chartRegistry";

// Function to render the selected chart type
export function renderChart(chartType: string,data :any[],chartRegistry : ChartRegistry) {
    
    // Clear existing chart container
    const container = document.querySelector(chartRegistry.get(chartType).chartConfig?.parentElement+'');
    if (container) container.innerHTML = '';

    // Retrieve and instantiate the selected chart class
    const ChartRegistration = chartRegistry.get(chartType);
    if (ChartRegistration.chartClass) {

        let chart = new ChartRegistration.chartClass(ChartRegistration.chartConfig, data);
        chart.updateVis();
        return chart ;

    } else {
        console.error(`Unknown chart type: ${chartType}`);
    }
}
