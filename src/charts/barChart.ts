import * as d3 from 'd3';
import { BaseChart } from './baseChart';

export class BarChart extends BaseChart {
    highlightRect: any;

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
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "#fff")
            .style("padding", "8px")
            .style("border-radius", "5px")
            .style("font-size", "12px")
            .style("pointer-events", "none")
            .style("box-shadow", "0px 4px 8px rgba(0,0,0,0.3)");
        
        vis.highlightRect = vis.chart.append("rect")
            .attr("class", "highlight-rect")
            .style("fill", "none")
            .style("stroke", "orange")
            .style("stroke-width", 2)
            .style("opacity", 0);
   
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

            bars.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => vis.xScale(d.xValue) as number)
            .attr('y', d => vis.yScale(d.yValue))
            .attr('width', vis.xScale.bandwidth())
            .attr('height', d => vis.height - vis.yScale(d.yValue))
            .attr('fill', 'steelblue')
            .on('mouseover', (event, d) => vis.onMouseOver(event, d))
            .on('mousemove', (event) => vis.onMouseMove(event))
            .on('mouseout', () => vis.onMouseOut())
            .merge(bars)
            .transition().duration(500)
            .attr('y', d => vis.yScale(d.yValue))
            .attr('height', d => vis.height - vis.yScale(d.yValue));

        bars.exit().remove();
                
        // update the axes
        vis.xAxis.call(d3.axisBottom(vis.xScale));
        vis.yAxis.call(d3.axisLeft(vis.yScale));
        
    }
    
    /// this is listiner in the mous movement out 
    // to make the tooltip invisible 
    protected onMouseOut() {
        const vis = this;
        vis.tooltip.transition().duration(200).style("opacity", 0);
        vis.highlightRect.transition().duration(200).style("opacity", 0);
    }

    // this is listiner in the mous movement over the bar item  
    // to make the tooltip visible nad give it its data  
   
    protected onMouseOver(event: any, d: any) {
        const vis = this;
        if(d){
        vis.tooltip
            .transition().duration(200)
            .style("opacity", 1);

        vis.tooltip
            .html(`
                <strong>${d.xValue}</strong><br/>
                Value: <span style="color: yellow">${d.yValue}</span>
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 40) + "px");

        // Highlight the bar with a rectangle
        vis.highlightRect
            .attr("x", vis.xScale(d.xValue))
            .attr("y", vis.yScale(d.yValue))
            .attr("width", vis.xScale.bandwidth())
            .attr("height", vis.height - vis.yScale(d.yValue))
            .transition().duration(200)
            .style("opacity", 1);
        }
    }

    protected onMouseMove(event: any) {
        const vis = this;

        vis.tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 40) + "px");
    }

}
