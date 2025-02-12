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
    dataSetURL:'./assets/data/vancouver_trails.csv',
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
    xField: 'Year', 
    yField: 'NA_Sales', 
    fields: ['Year', 'Global_Sales'], 
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'steelblue',    
    dataSetURL:'./assets/data/vgsales.csv',
    chartTitle: 'SP 500 Index ',
    timeFormat:"%Y" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45},
    description: "This line chart tracks the historical performance of the S&P 500 index over time."


};
export const barChartConfig : ChartConfig = {
    parentElement: '#chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'Genre', 
    yField: 'Global_Sales', 
    fields: ['Genre', 'Global_Sales'], 
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'steelblue',    
    dataSetURL:'./assets/data/vgsales.csv',
    chartTitle: 'Monthly Sales Data',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45},
    description: "This bar chart shows monthly sales performance, helping analyze trends and seasonal variations."

};

export const pieChartConfig : ChartConfig = {
    parentElement: '#chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'month', 
    yField: 'sales', 
    fields: ['month', 'sales'],
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'steelblue',    
    dataSetURL:'./assets/data/sales.csv',
    chartTitle: 'Monthly Sales Data',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45},
    description: "This bar chart shows monthly sales performance, helping analyze trends and seasonal variations."

};