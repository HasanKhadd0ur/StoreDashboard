import { BaseChart } from './baseChart';
import * as d3 from 'd3';

export class LineChart extends BaseChart {
    line: d3.Line<any>;
    linePath: d3.Selection<SVGPathElement, unknown, HTMLElement, undefined>;
    focus: any;
    xAxisFocusG: any;
    tooltipTrackingArea: any;
    yAxisFocusG: any;

    protected initVis() {
        const vis = this;

        super.initVis();
        vis.setupScales();
        
        vis.initCanvas()

        vis.createTooltip();
        

        // Update the chart
        vis.updateVis();

    }

    protected renderVis() {
        const vis = this;

        // Draw the line path
        vis.linePath.datum(vis.data)
            .attr('d', vis.line);
        
        vis.tooltipTrackingArea
            // mouse events listners 
            .on("mouseover", (event,d) => vis.onMouseOver(event,d))
            .on("mousemove", (event) => vis.onMouseMove(event))
            .on("mouseout", () => vis.onMouseOut());

            // Update the axes
        vis.xAxisFocusG.call(vis.xAxis);
        vis.yAxisFocusG.call(vis.yAxis);
 }

    public updateVis(): void {
        const vis =this ;
    
        // Initialize line and area generators
        vis.line = d3.line()
            .x((d :any) => vis.xScale(vis.xValueAccessor(d)))
            .y((d :any) => vis.yScale(vis.yValueAccessor(d)));
    
    
        // Set the scale input domains
        vis.xScale.domain(d3.extent(vis.data, vis.xValueAccessor));
        vis.yScale.domain(d3.extent(vis.data, vis.yValueAccessor));

        vis.renderVis();
    }

    protected  initCanvas(){
        const vis =this ;
        super.initCanvas();
    
    
        // Initialize axes
        vis.xAxis = d3.axisBottom(vis.xScale).tickSizeOuter(0);
        
        vis.yAxis = d3.axisLeft(vis.yScale);
    
        // Append focus group with x- and y-axes
        vis.focus = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
    
        vis.focus.append('defs').append('clipPath')
            .attr('id', 'clip')
          .append('rect')
            .attr('width', vis.width)
            .attr('height', vis.height);
        
        vis.linePath = vis.focus.append('path')
            .attr('class', 'chart-line')

        vis.xAxisFocusG = vis.focus.append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', `translate(0,${vis.height})`);
    
        vis.yAxisFocusG = vis.focus.append('g')
            .attr('class', 'axis y-axis');
    
        vis.tooltipTrackingArea = vis.focus.append('rect')
            .attr('width', vis.width)
            .attr('height', vis.height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all');
    
    
    
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

    protected setupScales(){
        const vis =this;

        vis.xScale= d3.scaleTime()
        .range([0, vis.width])

        vis.yScale = d3.scaleLinear()
        .range([vis.height, 0])
        .nice();
    }

    protected mapData(data: any[]): void {

        const vis = this;

        // Parse numeric values and map fields name
        vis.data = data.map(d => ({
            xValue: new Date(d3.timeParse(vis.config.timeFormat)(d[this.config.xField])),
            yValue: d[this.config.yField]
        }));
    }
    protected createTooltip(): void {
        const vis =this;

        super.createTooltip();
                // Create a tooltip circle
        vis.tooltipCircle = vis.chart.append('circle')
                .attr('class', 'tooltip-circle')
                .attr('r', 5)
                .attr('fill', vis.config.lineColor)
                .attr('stroke', 'white')
                .attr('stroke-width', 2)
                .style('opacity', 0);
    
    }

}
