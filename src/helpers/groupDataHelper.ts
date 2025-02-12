import * as d3 from 'd3';

export const groupData = (data : any [],xField :string ,yField:string)=>{
    
    const groupedData = d3.rollups(
            data,
            (values) => d3.sum(values, (d) => d[yField]), // Sum Global Sales for each year
            (d) => d[xField]
        );
    
    return groupedData
        // .map(([xValue, yValue]) => ({ xValue: xValue, yValue }))
        .sort((a, b) => a[xField] - b[xField]); // Sort by year

}