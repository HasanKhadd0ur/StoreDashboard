import { ChartConfig } from "./charts/chartConfig";

export class ChartRegistry {

    private chartTypes: { [key: string]: any } = {};
    private chartConfig: { [key: string]: ChartConfig } = {};
    private callback: { [key: string]: (data :any[] )=> any[] }={}

    register(name: string, chartClass: any,chartConfig :ChartConfig, callback : any =null): void {
        if (this.chartTypes[name]) {
            console.error(`Chart type "${name}" is already registered.`);
            return;
        }
        this.chartTypes[name] = chartClass;
        this.chartConfig[name]=chartConfig
        this.callback[name]=callback;
    }

    get(name: string): {chartClass : any | null , chartConfig :ChartConfig | null,callback :any|null}  {

        return {
            chartClass:this.chartTypes[name] || null ,
            chartConfig:this.chartConfig[name]|| null,
            callback:this.callback[name]||null
        };
    }
}