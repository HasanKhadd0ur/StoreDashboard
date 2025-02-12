import { ChartConfig } from "../charts/chartConfig";

// Base Cnfig 
export const BaseChartConfig : ChartConfig = {
    parentElement: '#chart',
    containerWidth: 800,
    containerHeight: 600,
    margin: { top: 50, right: 50, bottom: 50, left: 50 },
    xField: 'time',
    yField: 'distance',
    color: 'steelblue',
    textColor: 'black',
    lineColor: 'black',
    dataSetURL:'./assets/data/vgsales.csv',
    fields:['trail','region','difficulty','time','distance','season'],
    chartTitle: 'North America vs. Global Sales',
    timeFormat:"%Y-%m-%d" ,
    contextHeight: 50,
    contextMargin: {top: 280, right: 10, bottom: 20, left: 45},
    description:"This scatter plot visualizes the correlation between North American sales and total global sales of video games."
};

// Default Configuration for line Chart
export const ScatterChartConfig : ChartConfig = {
    ...BaseChartConfig,
    xField: 'time',
    yField: 'distance',
    dataSetURL:'./assets/data/vancouver_trails.csv',
    fields:['trail','region','difficulty','time','distance','season'],
    chartTitle: 'North America vs. Global Sales',
    description:"This scatter plot visualizes the correlation between North American sales and total global sales of video games."

};

// Line Chart Configuration (Global Sales Over Years)
export const lineChartConfig: ChartConfig = {
    ...BaseChartConfig,
    xField: 'Year',
    yField: 'Global Sales',
    fields: ['Year', 'Global Sales'],   
    color: 'steelblue',
    textColor: 'black',
    chartTitle: 'Global Sales Over the Years',
    timeFormat: "%Y",
    description: "This line chart illustrates the total global sales of video games across different years."
};

// Bar Chart Configuration (Sales by Genre)
export const barChartConfig: ChartConfig = {
    ...BaseChartConfig,
    xField: 'Genre',
    yField: 'Global Sales',
    fields: ['Genre', 'Global Sales'],
    chartTitle: 'Video Game Sales by Genre',
    description: "This bar chart shows the total global sales of video games for each genre, highlighting popular categories."
};

export const YearbarChartConfig: ChartConfig = {
    ...BaseChartConfig,
    xField: 'month',
    yField: 'sales',
    fields: ['month', 'sales'],
    dataSetURL: './assets/data/sales.csv',
    chartTitle: 'Video Game Sales by Month',
    timeFormat: "%Y",
    description: "This bar chart shows the total global sales of video games for each genre, highlighting popular categories."
};

export const pieChartConfig : ChartConfig = {
    ...BaseChartConfig,
    xField: 'month', 
    yField: 'sales', 
    fields: ['month', 'sales'],
    dataSetURL:'./assets/data/sales.csv',
    chartTitle: 'Monthly Sales Data',
    timeFormat:"%Y-%m-%d" ,
    description: "This bar chart shows monthly sales performance, helping analyze trends and seasonal variations."

};