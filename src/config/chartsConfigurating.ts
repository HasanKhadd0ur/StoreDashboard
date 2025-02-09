import { ChartConfig } from "../charts/chartConfig";

// Default Configuration for line Chart
export const ScatterChartConfig : ChartConfig = {
    parentElement: '#chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'time',
    yField: 'distance',
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'black',
    dataSetURL:'/assets/data/vancouver_trails.csv',
    fields:['trail','region','difficulty','time','distance','season'],
    chartTitle: 'Vancouver Trails',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45},
    description: "This line chart tracks the historical performance of the S&P 500 index over time."


};

// Default Configuration for line Chart
export const lineChartConfig : ChartConfig = {
    parentElement: '#chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'date', // Assuming you have a field for x-axis data
    yField: 'close', // Assuming you have a field for y-axis data
    fields: ['date', 'close'], // Fields that are present in the dataset
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'steelblue',    
    dataSetURL:'/assets/data/sp_500_index.csv',
    chartTitle: 'SP 500 Index ',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45},
    description: "This line chart tracks the historical performance of the S&P 500 index over time."


};
export const barChartConfig : ChartConfig = {
    parentElement: '#chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'month', // Assuming you have a field for x-axis data
    yField: 'sales', // Assuming you have a field for y-axis data
    fields: ['month', 'sales'], // Fields that are present in the dataset
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'steelblue',    
    dataSetURL:'/assets/data/sales.csv',
    chartTitle: 'Monthly Sales Data',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45},
    description: "This bar chart shows monthly sales performance, helping analyze trends and seasonal variations."

};