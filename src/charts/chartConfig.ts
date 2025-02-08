export interface ChartConfig {
    parentElement: string;
    containerWidth: number ;
    containerHeight: number;
    margin: { top: number; right: number; bottom: number; left: number };
    xField: string;
    yField: string;
    fields:string[];
    color: string;
    textColor: string;
    chartTitle: string;
    dataSetURL:string;
    lineColor:string;
    timeFormat:string;
    contextHeight:number;
    contextMargin: { top: number; right: number; bottom: number; left: number } ;

}