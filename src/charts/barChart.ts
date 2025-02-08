import * as d3 from 'd3';
import { BaseChart } from './baseChart';

export class BarChart extends BaseChart {

    protected initVis(): void {
        const vis = this;

        super.initVis();
        super.initCanvas();
        vis.setupScales();
        
        // // Create x and y axes
        vis.xAxis = vis.chart.append("g").attr("class", "x-axis").attr("transform", `translate(0,${vis.height})`);
        vis.yAxis = vis.chart.append("g").attr("class", "y-axis");

        // Create tooltip
        vis.createTooltip();

        // Initialize chart
        vis.updateVis();
    }

    protected createTooltip(): void {
        const vis = this;

        // Create tooltip div
        vis.tooltip = d3
            .select(vis.config.parentElement)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background-color", "lightgray")
            .style("border", "1px solid #ccc")
            .style("padding", "5px")
            .style("pointer-events", "none");

        // Create overlay for mouse interaction
        vis.overlay = vis.chart
            .append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .style("opacity", 0)
            .on("mouseover", (event, d) => vis.onMouseOver(event, d))
            .on("mousemove", (event) => vis.onMouseMove(event))
            .on("mouseout", () => vis.onMouseOut());
    }

    protected setupScales() {
        const vis = this;
        
        
        // Band scale for categorical x-axis (e.g., 'Product Name', 'Customer Name')
        vis.xScale = d3.scaleBand()
            .domain(vis.data.map(d => d.xValue)) // Map categories
            .range([0, vis.width])
            .padding(0.1);

        // Linear scale for numerical y-axis (e.g., 'Sales', 'Profit')
        vis.yScale = d3.scaleLinear()
            .range([vis.height, 0]);
    }

    public updateVis() {
        const vis = this;

        // Update y scale domain based on selected field
        // vis.yScale.domain([0, d3.max(vis.data, d => d.yValue) as number]);
        // vis.yScale.domain(d3.extent(vis.data,vis.yValueAccessor));
        // vis.xScale.domain(d3.extent(vis.data,vis.xValueAccessor));
        vis.yScale.domain([0, d3.max(vis.data, vis.yValueAccessor)*4]);

        // Update x-axis labels
        vis.xAxis.transition().duration(500).call(d3.axisBottom(vis.xScale));
        vis.yAxis.transition().duration(500).call(d3.axisLeft(vis.yScale));

        vis.renderVis();
    }

    protected renderVis() {
        const vis = this;

        // Bind data to bars
        const bars = vis.chart.selectAll('.bar')
            .data(vis.data, d => d.xValue);

        // ENTER: Create new bars
        bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => vis.xScale(d.xValue) as number)
            .attr('y', d => vis.yScale(d.yValue))
            .attr('width', vis.xScale.bandwidth())
            .attr('height', d => vis.height - vis.yScale(d.yValue))
            .attr('fill', 'steelblue')
            .on('mouseover', (event :any , d: any ) => vis.onMouseOver(event, d))
            .on('mousemove', (event :any ) => vis.onMouseMove(event))
            .on('mouseout', () => vis.onMouseOut())
            .merge(bars) // Handle updates
            .transition().duration(500)
            .attr('y', d => vis.yScale(d.yValue))
            .attr('height', d => vis.height - vis.yScale(d.yValue));

        // EXIT: Remove unused bars
        bars.exit().remove();
        
        // update the axes
        vis.xAxis.call(d3.axisBottom(vis.xScale));
        vis.yAxis.call(d3.axisLeft(vis.yScale));
        
    }
    
    /// this is listiner in the mous movement out 
    // to make the tooltip invisible 
    protected onMouseOut() {
        const vis = this ;
        vis.tooltip.style("opacity", 0);
    }

    // this is listiner in the mous movement over the bar item  
    // to make the tooltip visible nad give it its data  
    protected onMouseOver(event : any , d :any ) {
        const vis =this ;
        console.log(d)
        vis.tooltip
            .style("opacity", 1)
            .text(`${d.xValue}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

    /// this is listiner in the mous movement move  
    // to make the tooltip position on the mouse coordinates 
    protected onMouseMove(event :any ) 
    {
        const vis =this;

        vis.tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

}
