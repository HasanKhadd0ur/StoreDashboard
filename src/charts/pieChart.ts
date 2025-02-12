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
        vis.initCanvas();
        vis.updateVis();
    }

    protected initCanvas(): void {
        const vis = this;
        super.initCanvas();

        // Create tooltip
        vis.createTooltip();

        // Set up the radius for the pie chart
        this.radius = Math.min(this.width, this.height) / 2;
        // Create a group for the pie chart
        vis.chart = vis.chart.append("g")
            .attr("transform", `translate(${vis.width / 2}, ${vis.height / 2})`); // Centering the pie chart
    }

    protected createTooltip(): void {
        const vis = this;

        // Create tooltip div
        vis.tooltip = d3
            .select(vis.config.parentElement)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("padding", "8px")
            .style("border-radius", "5px")
            .style("pointer-events", "none")

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

        // Update scales
        //  (no need for x or y scales in a pie chart,we  just use d3.pie() and d3.arc() )
        vis.pie = d3.pie()
            .value((d: any) => d.yValue) 
            .sort(null); // No sorting of slices

        // Arc generator
        vis.arc = d3.arc()
            .innerRadius(0) 
            .outerRadius(vis.radius); 

        vis.renderVis();
    }

    protected renderVis() {
        const vis = this;

        // Bind data to pie slices
        const slices = vis.chart.selectAll('.slice')
            .data(vis.pie(vis.data), (d: any) => d.data.xValue); 

        slices.enter()
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

        slices.exit().remove();
    }

    protected onMouuseOut(event: any) {
        const vis = this;
        vis.tooltip.transition().duration(200).style("opacity", 0);
    
        // remove the border class on mouse out
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
    }

}
