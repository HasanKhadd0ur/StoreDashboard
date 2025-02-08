import { BaseChart } from "./baseChart";
import * as d3 from 'd3'

export class ScatterChart extends BaseChart {
    protected colorScale: any;
    protected colorValue: (d: any) => string;

    protected initVis() {
     
        super.initVis();
        this.setupScales();
        this.initCanvas();

        this.updateVis();

    }


    public updateVis() {
        let vis = this;

        // Set the scale input domains
        vis.xScale.domain(d3.extent(vis.data,vis.xValueAccessor));
        vis.yScale.domain([0, d3.max(vis.data,  d => d.yValue)*2.9]);
    
        vis.renderVis();
    }
    
    protected renderVis() {
        const vis = this;

        const points = vis.chart.selectAll('.point')
            .data(vis.rawData, (d: any) => d.id);
        
        vis.colorScale = d3.scaleOrdinal()
            .range(['#d3eecd', '#7bc77e', '#2a8d46'])
            .domain(['Easy', 'Intermediate', 'Difficult']);

       
        points.enter()
            .append('circle')
            .attr('class', 'point')
            .attr('r', 4)
            .attr('cx', d => vis.xScale(d[vis.config.xField]))
            .attr('cy', d => vis.yScale(d[vis.config.yField]))
            .attr('fill', d => vis.colorScale(d.difficulty ))
            .on("mouseover", (event,d) => this.onMouseOver(event,d))
            .on("mousemove", (event) => this.onMouseMove(event))
            .on("mouseout", () => this.onMouseOut())
            .transition().duration(300)
            .attr('cx', d => vis.xScale(d[vis.config.xField]))
            .attr('cy', d => vis.yScale(d[vis.config.yField]));

       points.exit().remove();

        vis.xAxis.call(d3.axisBottom(vis.xScale).ticks(6));
        
        vis.yAxis.call(d3.axisLeft(vis.yScale).ticks(6));
        
    }
    protected initCanvas(): void {
        const vis =this;
        super.initCanvas();

        vis.colorScale = d3.scaleOrdinal()
            .range(['#d3eecd', '#7bc77e', '#2a8d46'])
            .domain(['Easy', 'Intermediate', 'Difficult']);

       vis.tooltip = d3.select(vis.config.parentElement)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
                

            
        // Ooerlay rectangle for capturing mouse events
        vis.overlay = vis.chart.append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .style("opacity", 0)
        
        vis.colorValue = d => d.difficulty as string;


    }
    protected onMouseOver(_event : any,d:any): void {
        const vis= this;
        
        vis.tooltip.style('opacity', 1)
                .html(`<div>Time: ${d[vis.config.xField]} hrs</div><div>Distance: ${d[vis.config.yField]} km</div></div>`);
    }

    protected onMouseOut() {
        const vis= this;
        vis.tooltip.style("opacity", 0);
    }
   
    protected setupScales(){
        const vis =this;

        // Time scale for the date field
        vis.xScale = d3.scaleLinear().range([0, vis.width]);

        // Linear scale for the value field
        vis.yScale = d3.scaleLinear().range([vis.height, 0]);  
    }
  }
