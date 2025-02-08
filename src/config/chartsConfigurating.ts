import { ChartConfig } from "../charts/chartConfig";

// Default Configuration for line Chart
export const ScatterChartConfig : ChartConfig = {
    parentElement: '#scatter-chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'time',
    yField: 'distance',
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'black',
    dataSetURL:'/data/vancouver_trails.csv',
    fields:['trail','region','difficulty','time','distance','season'],
    chartTitle: 'Vancouver Trails',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45}

};

// Default Configuration for line Chart
export const lineChartConfig : ChartConfig = {
    parentElement: '#line-chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'date', // Assuming you have a field for x-axis data
    yField: 'close', // Assuming you have a field for y-axis data
    fields: ['date', 'close'], // Fields that are present in the dataset
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'steelblue',    
    dataSetURL:'/data/sp_500_index.csv',
    chartTitle: 'SP 500 Index ',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45}

};
export const barChartConfig : ChartConfig = {
    parentElement: '#bar-chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'month', // Assuming you have a field for x-axis data
    yField: 'sales', // Assuming you have a field for y-axis data
    fields: ['month', 'sales'], // Fields that are present in the dataset
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'steelblue',    
    dataSetURL:'/data/sales.csv',
    chartTitle: 'SP 500 Index ',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45}

};