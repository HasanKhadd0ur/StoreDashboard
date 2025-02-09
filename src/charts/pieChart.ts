import * as d3 from 'd3';
import { BaseChart } from './baseChart';

export class PieChart extends BaseChart {
    highlightSlice: any;
    pie: any;
    arc: any;
    radius: number;

    protected initVis(): void {
        const vis = this;
        super.initVis();
        vis.setupScales();
        vis.initCanvas();

        // Initialize chart
        vis.updateVis();
    }

    protected initCanvas(): void {
        const vis = this;
        super.initCanvas();

        // Create tooltip
        vis.createTooltip();

        // Create a group for the pie chart
        vis.chart = vis.chart.append("g")
            .attr("transform", `translate(${vis.width / 2}, ${vis.height / 2})`); // Centering the pie chart

        // Initialize other elements if necessary
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

        // Highlight slice (for mouseover)
        vis.highlightSlice = vis.chart.append("path")
            .attr("class", "highlight-slice")
            .style("fill", "none")
            .style("stroke", "orange")
            .style("stroke-width", 2)
            .style("opacity", 0);
    }

    public updateVis() {
        const vis = this;

        // Update scales (no need for x or y scales in a pie chart, just use `d3.pie()` and `d3.arc()`)
        vis.pie = d3.pie()
            .value((d: any) => d.yValue) // use yValue to define the size of each slice
            .sort(null); // No sorting of slices by default

        // Arc generator
        vis.arc = d3.arc()
            .innerRadius(0) // No inner radius for a full pie chart
            .outerRadius(vis.radius); // Outer radius for the pie slices

        // Update chart (render the pie)
        vis.renderVis();
    }

    protected renderVis() {
        const vis = this;

        // Bind data to pie slices
        const slices = vis.chart.selectAll('.slice')
        .data(vis.pie(vis.data), (d: any) => d.data.xValue); // Ensure data-binding works with pie layout

        const sliceElements = slices.enter()
        .append('path')
        .attr('class', 'slice')
        .attr('d', vis.arc)
        .style('fill', (d: any) => d3.schemeCategory10[d.index % 10]) // Color scheme for slices
        .on('mouseover', (event, d) => vis.onMouseOver(event, d))
        .on('mousemove', (event) => vis.onMouseMove(event))
        .on('mouseout',  (event) => vis.onMouuseOut(event))
        .merge(slices)
        .transition().duration(500)
        .attr('d', vis.arc);

    // Add text labels over the slices
    // sliceElements.append('text')
    //     .attr('transform', (d: any) => {
    //         const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    //         const x = vis.arc.centroid(d)[0];
    //         const y = vis.arc.centroid(d)[1];
    //         return `translate(${x}, ${y})`;
    //     })
    //     .attr('dy', '.35em')
    //     .attr('text-anchor', 'middle')
    //     .text((d: any) => `${d.data.xValue}`)
    //     .style('fill', 'white') // Set label text color
    //     .style('font-size', '12px'); // Font size for labels

        slices.exit().remove();
    }

    protected setupScales() {
        const vis = this;

        // Set up the radius for the pie chart
        vis.radius = Math.min(vis.width, vis.height) / 2;

        // The pie chart will be centered, so no need for xScale or yScale
    }

    protected onMouuseOut(event: any) {
        const vis = this;
        vis.tooltip.transition().duration(200).style("opacity", 0);
        // vis.highlightSlice.transition().duration(200).style("opacity", 0);
    
        // Remove the border class on mouse out
        d3.select(event.target).classed('border', false);
    }

    protected onMouseOver(event: any, d: any) {
        const vis = this;
        // Highlight slice (for mouseover)
        vis.highlightSlice = vis.chart.append("path")
            .attr("class", "highlight-slice")
            .style("fill", "none")
            .style("stroke", "orange")
            .style("stroke-width", 2)
            .style("opacity", 0);

        // Show tooltip on mouse over
        vis.tooltip.transition().duration(200).style("opacity", 1);
        vis.tooltip.html(`
            ${this.config.xField}: <strong>${d.data.xValue}</strong><br/>
            ${this.config.yField}: ${d.data.yValue}
        `)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 40) + "px");

        d3.select(event.target).classed('border', true);
     // Highlight the slice
    //  vis.highlightSlice
    //  .attr("d", vis.arc)
    //  .style("fill", "none")
    //  .style("stroke", "blue")
    //  .style("stroke-width", 2)
    //  .transition().duration(200)
    //  .style("opacity", 1);    
    }

    protected onMouseMove(event: any) {
        const vis = this;
        vis.tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 40) + "px");
    }
}
