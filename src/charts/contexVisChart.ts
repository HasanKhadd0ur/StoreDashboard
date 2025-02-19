import * as d3 from "d3";
import { LineChart } from "./lineChart";

export class ContextVisChart extends LineChart {
  // area path for the context chart 
  private contextAreaPath: d3.Selection<SVGPathElement,unknown,HTMLElement, undefined>;
  // scales y and x for the context chart 
  private xScaleContext: any;
  private yScaleContext: d3.ScaleLinear<number, number>;

  private brush: d3.BrushBehavior<any>;
  private brushG: d3.Selection<SVGGElement, unknown, HTMLElement, undefined>;

  xAxisContext: any;
  xAxisContextG: any;
  context: any;
  area: any;
  bisectDate: any;

  protected initVis() {
    let vis = this;

    // super.initVis();
    vis.width  =vis.config.containerWidth -vis.config.margin.left -vis.config.margin.right;
    vis.height =vis.config.containerHeight - vis.config.contextHeight -vis.config.margin.top -vis.config.margin.bottom;

    // setup scales 
    vis.setupScales();
    vis.initCanvas();
    vis.createTooltip();

    vis.updateVis();
  }

  protected initCanvas() {
    const vis = this;

    super.initCanvas();

    // setup Scales for context chart 
    vis.xScaleContext = d3.scaleTime().range([0, vis.width]);
    vis.yScaleContext = d3.scaleLinear()
      .range([vis.config.contextHeight, 0])
      .nice();

    // craeat axis for context chart 
    vis.xAxisContext = d3.axisBottom(vis.xScaleContext).tickSizeOuter(0);

    // Move the context below the main chart
    vis.context = vis.svg
      .append("g")
      .attr("class", "context")
      .attr(
        "transform",
        `translate(${vis.config.margin.left}, ${
          vis.height + vis.config.margin.bottom + 20
        })`
      );

    vis.contextAreaPath = vis.context
      .append("path")
      .attr("class", "chart-area");

    vis.xAxisContextG = vis.context
      .append("g")
      .attr("class", "axis x-axis")
      .attr("transform", `translate(0, ${vis.config.contextHeight})`);

    vis.brushG = vis.context.append("g").attr("class", "brush x-brush");

    // Initialize brush component
    vis.brush = d3
      .brushX()
      .extent([[0, 0],[vis.width, vis.config.contextHeight],])
      .on("brush", function ({ selection }) {
        if (selection) vis.brushed(selection);
      })
      .on("end", function ({ selection }) {
        if (!selection) vis.brushed(null);
      });
  }

  public updateVis(): void {
    let vis = this;

    vis.xValue = (d) => d.xValue;
    vis.yValue = (d) => d.yValue;

    // Initialize line and area generators
    vis.line = d3
      .line()
      .x((d: any) => vis.xScale(vis.xValue(d)))
      .y((d: any) => vis.yScale(vis.yValue(d)));

    vis.area = d3
      .area()
      .x((d: any) => vis.xScaleContext(vis.xValue(d)))
      .y1((d: any) => vis.yScaleContext(vis.yValue(d)))
      .y0(vis.config.contextHeight);

    // Set the scale input domains
    vis.xScale.domain(d3.extent(vis.data, vis.xValue));
    vis.yScale.domain(d3.extent(vis.data, vis.yValue));
    // Set the scale input domains for the context 
    vis.xScaleContext.domain(vis.xScale.domain());
    vis.yScaleContext.domain(vis.yScale.domain());
    // bisector for toolltip circel x value 
    vis.bisectDate = d3.bisector(vis.xValue).left;

    vis.renderVis();
  }

  protected renderVis() {
    let vis = this;

    vis.linePath
      .datum(vis.data)
      .attr('d', vis.line);

    vis.contextAreaPath
      .datum(vis.data)
      .attr('d', vis.area);

    vis.tooltipTrackingArea
      // mouse events listners
      .on("mouseover", (event, d) => vis.onMouseOver(event, d))
      .on("mousemove", (event) => vis.onMouseMove(event))
      .on("mouseout", () => vis.onMouseOut());

      // Update the axes
    vis.xAxisFocusG.call(vis.xAxis);
    vis.yAxisFocusG.call(vis.yAxis);
    vis.xAxisContextG.call(vis.xAxisContext);

    // Update the brush and define a default position
    const defaultBrushSelection = [
      vis.xScale(new Date("2000")),
      vis.xScaleContext.range()[1],
    ];
    vis.brushG.call(vis.brush).call(vis.brush.move, defaultBrushSelection);
  }

  brushed(selection: any) {
    let vis = this;


    if (!vis.xScaleContext) {
      console.error("xScaleContext is not defined.");
      return;
    }

    // Check if the brush is still active or if it has been removed
    if (selection) {
      // Convert given pixel coordinates
      const selectedDomain = selection.map((d: number) =>
        vis.xScaleContext.invert(d)
      );

      // Update x-scale of the focus view accordingly
      vis.xScale.domain(selectedDomain);
    } else {
      // Reset x-scale of the focus viewd
      vis.xScale.domain(vis.xScaleContext.domain());
    }
    
    // Redraw line and update x-axis labels in focus view
    vis.linePath.attr("d", vis.line);
    vis.xAxisFocusG.call(vis.xAxis);
  }

}
