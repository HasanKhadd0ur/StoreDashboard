import { BaseChart } from './baseChart';
import * as d3 from 'd3';

export class LineChart extends BaseChart {
    lineGenerator: d3.Line<any>;
    linePath: d3.Selection<SVGPathElement, unknown, HTMLElement, undefined>;

    protected initVis() {
        const vis = this;

        super.initVis();
    
        this.setupScales();
        vis.createTooltip();
        
        // Define the line generator
        vis.lineGenerator = d3.line()
            .x((d: any) => vis.xScale(d.xValue))
            .y((d: any) => vis.yScale(d.yValue))
            .curve(d3.curveLinear);

        // Line path to define the line chart
        vis.linePath = vis.chart.append('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', vis.config.lineColor)
            .attr('stroke-width', 2);

        // Create a tooltip circle
        vis.tooltipCircle = vis.chart.append('circle')
            .attr('class', 'tooltip-circle')
            .attr('r', 5)
            .attr('fill', vis.config.lineColor)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('opacity', 0);

        // Update the chart
        vis.updateVis();

    }


    protected renderVis() {
        const vis = this;

        // Draw the line path
        vis.linePath.datum(vis.data)
            .attr('d', vis.lineGenerator);

        // Update the axes
        vis.xAxis.call(d3.axisBottom(vis.xScale)
            .ticks(6)
            .tickFormat((domainValue: any) => d3.timeFormat('%b %Y')(new Date(domainValue))));

        vis.yAxis.call(d3.axisLeft(vis.yScale).ticks(6));
    }


    protected onMouseMove(event: any) {
        const vis = this;

        const [mouseX] = d3.pointer(event);

        // Reverse scale to get the date corresponding to the x position of the mouse
        const xDate = vis.xScale.invert(mouseX);

        // Find the closest data point
        const closestPoint = vis.data.reduce((a, b) => {
            return Math.abs(b.xValue - xDate) < Math.abs(a.xValue - xDate) ? b : a;
        });


        // Tooltip text
        vis.tooltip
            .html(`<strong>Date:</strong> ${d3.timeFormat(vis.config.timeFormat)(closestPoint.xValue)}<br/>
                   <strong>Value:</strong> ${closestPoint.yValue}`)
            .style('left', `${event.pageX + 10}px`)
            .style('top', `${event.pageY - 28}px`);

        // Position the tooltip circle
        vis.tooltipCircle
            .attr('cx', vis.xScale(closestPoint.xValue))
            .attr('cy', vis.yScale(closestPoint.yValue))
            .style('opacity', 1);
    }

    protected mapData(data: any[]): void {

        const vis = this;

        // Parse numeric values and map fields name
        vis.data = data.map(d => ({
            xValue: new Date (d[this.config.xField]).getUTCDate()  ,
            yValue: +d[this.config.yField]
        }));

    // Log data to check for issues
    console.log(vis.data);
    }
}
