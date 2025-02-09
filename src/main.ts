import './style.css';

import { ChartConfig } from "./charts/chartConfig";
import { chartRegistry } from "./config/registrationConfig";
import { renderChart } from "./helpers/chartRenderer";
import { DataLoader } from "./helpers/dataLoader";

const chartSelect = document.getElementById("chart-type") as HTMLSelectElement;
const scatterFilters = document.getElementById("scatter-filters") as HTMLElement;
const filterCheckboxes = document.querySelectorAll<HTMLInputElement>("#scatter-filters input");
let currentChartType = "scatterChart";

// Reference to the description element
const chartDescription = document.getElementById('chart-description');

// Function to update the chart description
function updateChartDescription(config :ChartConfig) {
    if (chartDescription) {
        chartDescription.textContent = config.description;
    }
}

// Event listener for chart type selection
document.getElementById("chart-type")!.addEventListener("change", (event) => {
    const selectedChart = (event.target as HTMLSelectElement).value;
    
    let config =chartRegistry.get(selectedChart).chartConfig;

    updateChartDescription(config!);
});

// Function to load and render the selected chart
const loadChart = () => {
    const selectedChart = chartSelect.value;

    // Show checkboxes only for scatter chart
    scatterFilters.style.display = selectedChart === "scatterChart" ? "block" : "none";

    let config = chartRegistry.get(selectedChart).chartConfig

    DataLoader(config!.dataSetURL, 100, (data: any[]) => {
        // Apply filtering for scatter plot
        if (selectedChart === "scatterChart") {
            const selectedDifficulties = Array.from(filterCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            data = data.filter(d => selectedDifficulties.includes(d.difficulty));
        }

        // Render chart
        renderChart(selectedChart, data, chartRegistry);
    });
};

// Listen for dropdown changes
chartSelect.addEventListener("change", () => {
    currentChartType = chartSelect.value;
    loadChart();
});

// Listen for filter checkbox changes
filterCheckboxes.forEach(checkbox =>
    checkbox.addEventListener("change", () => {
        if (currentChartType === "scatterChart") {
            loadChart();
        }
    })
);

// Initial chart load
loadChart();
