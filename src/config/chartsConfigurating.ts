import { ChartConfig } from "../charts/chartConfig";

// Default Configuration for line Chart
export const ScatterChartConfig : ChartConfig = {
    parentElement: '#scatter-chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'Quantity',
    yField: 'Sales',
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'black',
    dataSetURL:'/data/SuperStore_Sales_Dataset.csv',
    fields:['Sales','Quantity'],
    chartTitle: 'Vancouver Trails',
    timeFormat:"%Y-%m-%d" 
};

// Default Configuration for line Chart
export const lineChartConfig : ChartConfig = {
    parentElement: '#line-chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'Order Date', // Assuming you have a field for x-axis data
    yField: 'Quantity', // Assuming you have a field for y-axis data
    fields: ['Order Date', 'Quantity'], // Fields that are present in the dataset
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'steelblue',    
    dataSetURL:'/data/SuperStore_Sales_Dataset.csv',
    chartTitle: 'SP 500 Index ',
    timeFormat:"%d-%m-%Y" 
};