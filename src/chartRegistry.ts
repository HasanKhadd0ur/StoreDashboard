import { ChartConfig } from "./charts/chartConfig";

export class ChartRegistry {
    private chartTypes: { [key: string]: any } = {};
    private chartConfig: { [key: string]: ChartConfig } = {};

    register(name: string, chartClass: any,chartConfig :ChartConfig): void {
        if (this.chartTypes[name]) {
            console.error(`Chart type "${name}" is already registered.`);
            return;
        }
        this.chartTypes[name] = chartClass;
        this.chartConfig[name]=chartConfig
    }

    get(name: string): {chartClass : any | null , chartConfig :ChartConfig | null}  {

        return {
            chartClass:this.chartTypes[name] || null ,
            chartConfig:this.chartConfig[name]|| null
        };
    }
}