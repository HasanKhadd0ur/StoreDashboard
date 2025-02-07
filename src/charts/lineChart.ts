import { BaseChart } from './baseChart';
import * as d3 from 'd3';

export class LineChart extends BaseChart {
    private lineGenerator: d3.Line<any>;
    private areaGenerator: d3.Area<any>;
    
    private focusLinePath: d3.Selection<SVGPathElement, unknown, HTMLElement, undefined>;
    private contextAreaPath: d3.Selection<SVGPathElement, unknown, HTMLElement, undefined>;
    
    private xScaleContext: d3.ScaleTime<number, number>;
    private yScaleContext: d3.ScaleLinear<number, number>;

    private brush: d3.BrushBehavior<any>;
    private brushG: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;

    protected initVis() {
        const vis = this;

        super.initVis();
        vis.setupScales();
        vis.createTooltip();

        // Context scales
        vis.xScaleContext = d3.scaleTime().range([0, vis.config.containerWidth]);
        vis.yScaleContext = d3.scaleLinear().range([vis.config.contextHeight, 0]).nice();

        // Define focus line generator
        vis.lineGenerator = d3.line()
            .x(d => vis.xScale(d.xValue))
            .y(d => vis.yScale(d.yValue))
            .curve(d3.curveLinear);

        // Define area generator for context view
        vis.areaGenerator = d3.area()
            .x(d => vis.xScaleContext(d.xValue))
            .y1(d => vis.yScaleContext(d.yValue))
            .y0(vis.config.contextHeight);

        // Focus line path
        vis.focusLinePath = vis.chart.append('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke', vis.config.lineColor)
            .attr('stroke-width', 2);

        // Context area path
        vis.contextAreaPath = vis.chart.append('path')
            .attr('class', 'area')
            .attr('fill', vis.config.color)
            .attr('fill-opacity', 0.3);

        // Brush setup
        vis.brush = d3.brushX()
            .extent([[0, 0], [vis.width, vis.config.contextHeight]])
            .on('brush', (event) => vis.brushed(event.selection));

        vis.brushG = vis.chart.append('g')
            .attr('class', 'brush')
            .call(vis.brush)
            // .attr('transform', `translate(0, ${vis.height})`); // Move brush below the focus chart


        // Create a tooltip circle
        vis.tooltipCircle = vis.chart.append('circle')
            .attr('class', 'tooltip-circle')
            .attr('r', 5)
            .attr('fill', vis.config.lineColor)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('opacity', 0);

        vis.updateVis();
    }

    protected setupScales(){
        const vis =this;

        vis.xScale= d3.scaleTime()
        .range([0, vis.width]);


        vis.yScale = d3.scaleLinear()
        .range([vis.height, 0])
        .nice();
    }

    public updateVis(): void {
        const vis = this;
        // super.updateVis();
        // Update scales
        // as [Date, Date]

        vis.xScale.domain(d3.extent(vis.data, d => d.xValue) );
        vis.yScale.domain([0.91 * d3.min(vis.data, d => d.yValue) as number, d3.max(vis.data, d => d.yValue) as number]);

        vis.xScaleContext.domain(vis.xScale.domain());
        vis.yScaleContext.domain(vis.yScale.domain());

        vis.renderVis();
    }

    protected renderVis() {
        const vis = this;

        // Update focus line path
        vis.focusLinePath.datum(vis.data)
            .attr('d', vis.lineGenerator);

        // Update context area path
        vis.contextAreaPath.datum(vis.data)
            .attr('d', vis.areaGenerator);

        // Update axes
        vis.xAxis.call(d3.axisBottom(vis.xScale).ticks(6).tickFormat(d3.timeFormat('%b %Y')));
        vis.yAxis.call(d3.axisLeft(vis.yScale).ticks(6));

        // Render brush
        vis.brushG.call(vis.brush);

        // Update focus chart after brushing
        vis.updateFocus();
    }

    private brushed(selection: any) {
        const vis = this;

        if (selection) {
            // Map selection to focus domain
            const selectedDomain = selection.map(vis.xScaleContext.invert, vis.xScaleContext);
            vis.xScale.domain(selectedDomain);
        } else {
            // Reset zoom
            vis.xScale.domain(vis.xScaleContext.domain());
        }

        // Update focus chart and axes
        vis.updateFocus();
    }

    private updateFocus() {
        const vis = this;

        vis.focusLinePath.datum(vis.data)
            .attr('d', vis.lineGenerator);

        vis.xAxis.call(d3.axisBottom(vis.xScale));
        vis.yAxis.call(d3.axisLeft(vis.yScale));
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
        const parseTime = d3.timeParse("%Y-%m-%d");
        // Parse numeric values and map fields name
        vis.data = data.map(d => ({
            xValue:parseTime(d[vis.config.xField]) ,
            yValue: parseFloat(d[vis.config.yField])
        }));

        
    // Log data to check for issues
    console.log(vis.data);
    }
}
