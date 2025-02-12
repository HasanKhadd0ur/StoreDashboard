import { ChartRegistry } from "../chartRegistry";

// Function to render the selected chart type
export function renderChart(chartType: string,data :any[],chartRegistry : ChartRegistry) {

    const filterCheckboxes = document.querySelectorAll<HTMLInputElement>("#scatter-filters input");

    // Apply filtering for scatter plot
    if (chartType === "scatterChart") {
        const selectedDifficulties = Array.from(filterCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
        data = data.filter(d => selectedDifficulties.includes(d.difficulty));
    }

    // Clear existing chart container
    const container = document.querySelector(chartRegistry.get(chartType).chartConfig?.parentElement+'');
    if (container) container.innerHTML = '';

    // Retrieve and instantiate the selected chart class
    const ChartRegistration = chartRegistry.get(chartType);
    
    if (ChartRegistration.chartClass) {
        let call = ChartRegistration.callback;
        let config= ChartRegistration.chartConfig;

        if(call != null ){
            data =call(data,config?.xField,config?.yField)!;
            console.log(data)
        }

        let chart = new ChartRegistration.chartClass(config, data);
        // chart.updateVis();
        return chart ;

    } else {
        console.error(`Unknown chart type: ${chartType}`);
    }
}
