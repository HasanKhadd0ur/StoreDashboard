import * as d3 from 'd3';
import { ChartConfig } from './chartConfig';


export abstract class BaseChart {

    protected config: ChartConfig;
    protected height: number;
    protected width: number;
    protected data: {xValue : any , yValue : any}[];
    protected rawData : any[];
    protected svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, undefined>;
    protected chart: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
    protected xScale:any;
    protected yScale: d3.ScaleLinear<number, number>;
    protected xAxis: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
    protected yAxis: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;
    protected tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;
    protected overlay: d3.Selection<SVGRectElement, unknown, HTMLElement, undefined>;
    protected tooltipCircle: d3.Selection<SVGCircleElement, unknown, HTMLElement, undefined>;

    
    constructor(config: ChartConfig, data: any[]) {
        this.config = config;
        this.rawData=data;
        this.mapData(data);
        this.initVis();
    }
    
    protected initVis(){
        
        const vis =this ;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;
        
        // Create the SVG element which is the container of all other elements
        vis.svg = d3.select(vis.config.parentElement)
            .append('svg')
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);
    
        // Append a group element that will contain our actual chart
        vis.chart = vis.svg.append('g')
            .attr('transform', `translate(${vis.config.margin.left},${vis.config.margin.top})`);
        
        // Initialize axes x and y
        vis.xAxis = vis.chart.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0,${vis.height})`);
    
        vis.yAxis = vis.chart.append('g')
            .attr('class', 'y-axis');
        
        // Create a tooltip element to show helpful text near the mouse position
        // vis.createTooltip();
        
        // Add chart title
        vis.svg.append('text')
            .attr('x', vis.config.containerWidth / 2)
            .attr('y', vis.config.margin.top / 2)
            .attr('text-anchor', 'middle')
            .attr('class', 'title')
            .text(`${vis.config.chartTitle}`);

    }

    public updateVis() {
        const vis = this;

        vis.xScale.domain(d3.extent(vis.data, d => d.xValue) as [number, number]);

        vis.yScale.domain([d3.min(vis.data,d => d.yValue )  * (0.95) , d3.max(vis.data, d => d.yValue) as number * 1.1] );

        vis.renderVis();
    }

    protected abstract renderVis(): void;

    protected setupScales(){
        const vis =this;

        // Time scale for the date field
        vis.xScale = d3.scaleTime().range([0, vis.width]);

        // Linear scale for the value field
        vis.yScale = d3.scaleLinear().range([vis.height, 0]);  
    }

    // create the tool tip element to show helpfull text to the user when over the path 
    protected  createTooltip(){
        const vis = this ;
        
         // Tooltip element
        vis.tooltip = d3.select(vis.config.parentElement)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        
        // Ooerlay rectangle for capturing mouse events
        vis.overlay = vis.chart.append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .style("opacity", 0)
            
            // mouse events listners 
            .on("mouseover", (event,d) => this.onMouseOver(event,d))
            .on("mousemove", (event) => this.onMouseMove(event))
            .on("mouseout", () => this.onMouseOut());

    }

    /// this is listiner in the mous movement out 
    // to make the tooltip invisible 
    protected onMouseOut() {
        const vis= this;
        vis.tooltip.style("opacity", 0);
        vis.tooltipCircle.style("opacity", 1);
    }
    
    /// this is listiner in the mous movement move  
    // to make the tooltip position on the mouse coordinates 
    protected onMouseMove(event : any ) {
        const vis= this;
        vis.tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    }
    
    protected onMouseOver(_event :any , _d :any ): void {
        const vis = this;
        vis.tooltip.style('opacity', 1);
        vis.tooltipCircle.style('opacity', 1);
    }
    
    protected mapData(data : any[]):void{
        const vis =this ;

        // parse numeric values and map fields name 
        vis.data = data.map(d => ({
            xValue: d[this.config.xField],  
            yValue: d[this.config.yField]  
        }));
        
    }
}
