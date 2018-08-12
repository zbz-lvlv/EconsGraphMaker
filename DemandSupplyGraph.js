let demandSupply_SvgGraph = $("#demand_supply_svg_graph");

function demandSupplyGraphDraw(demandShift, supplyShift, ped, pes){

  //Setting up the SVG canvas
  let supposedHeight = $("#svg_graph_wrapper").height();
  let supposedWidth = $("#svg_graph_wrapper").width();

  let actualLength = Math.min(supposedWidth, supposedHeight); //Of a square

  demandSupply_SvgGraph.height(actualLength);
  demandSupply_SvgGraph.width(actualLength);

  if(supposedWidth >= supposedHeight){
    demandSupply_SvgGraph.css("left", (supposedWidth - supposedHeight) / 2);
  }
  else if(supposedWidth < supposedHeight){
    demandSupply_SvgGraph.css("top", (supposedHeight - supposedWidth) / 2);
  }

  /*
  Drawing of the actual graph
  Required:
  1. Axes
  2. Axes labels
  3. Demand line(s)
  4. Supply line(s)
  5. Line labels
  6. Price labels
  7. Quantity labels
  8. Equilibrium labels
  */

  //Defining margin constants
  let MARGIN_FRACTION_AXES = 0.1;
  let MARGIN_FRACTION_LINES = 0.1;
  let ARROW_SIZE = 8;

  //Defining other constants
  let COLOR = "#000000";
  let STROKE_WIDTH = "3";

  //Drawing the Axes
  let node0X = MARGIN_FRACTION_AXES * actualLength;
  let node0Y = MARGIN_FRACTION_AXES * actualLength;
  let node1X = MARGIN_FRACTION_AXES * actualLength;
  let node1Y = (1 - MARGIN_FRACTION_AXES) * actualLength;
  let node2X = (1 - MARGIN_FRACTION_AXES) * actualLength;
  let node2Y = (1 - MARGIN_FRACTION_AXES) * actualLength;

  var xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	xAxis.setAttribute('x1', node1X);
	xAxis.setAttribute('y1', node1Y);
	xAxis.setAttribute('x2', node2X);
	xAxis.setAttribute('y2', node2Y);
	xAxis.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + STROKE_WIDTH);
	demandSupply_SvgGraph.append(xAxis);

	var xAxisArrowHead0 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	xAxisArrowHead0.setAttribute('x1', node2X);
	xAxisArrowHead0.setAttribute('y1', node2Y);
	xAxisArrowHead0.setAttribute('x2', node2X - ARROW_SIZE);
	xAxisArrowHead0.setAttribute('y2', node2Y - ARROW_SIZE);
	xAxisArrowHead0.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + STROKE_WIDTH);
	demandSupply_SvgGraph.append(xAxisArrowHead0);

  var xAxisArrowHead1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	xAxisArrowHead1.setAttribute('x1', node2X);
	xAxisArrowHead1.setAttribute('y1', node2Y);
	xAxisArrowHead1.setAttribute('x2', node2X - ARROW_SIZE);
	xAxisArrowHead1.setAttribute('y2', node2Y + ARROW_SIZE);
	xAxisArrowHead1.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + STROKE_WIDTH);
	demandSupply_SvgGraph.append(xAxisArrowHead1);

  var yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	yAxis.setAttribute('x1', node0X);
	yAxis.setAttribute('y1', node0Y);
	yAxis.setAttribute('x2', node1X);
	yAxis.setAttribute('y2', node1Y);
	yAxis.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + STROKE_WIDTH);
	demandSupply_SvgGraph.append(yAxis);

  var yAxisArrowHead0 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	yAxisArrowHead0.setAttribute('x1', node0X);
	yAxisArrowHead0.setAttribute('y1', node0Y);
	yAxisArrowHead0.setAttribute('x2', node0X - ARROW_SIZE);
	yAxisArrowHead0.setAttribute('y2', node0Y + ARROW_SIZE);
	yAxisArrowHead0.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + STROKE_WIDTH);
	demandSupply_SvgGraph.append(yAxisArrowHead0);

  var yAxisArrowHead1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
	yAxisArrowHead1.setAttribute('x1', node0X);
	yAxisArrowHead1.setAttribute('y1', node0Y);
	yAxisArrowHead1.setAttribute('x2', node0X + ARROW_SIZE);
	yAxisArrowHead1.setAttribute('y2', node0Y + ARROW_SIZE);
	yAxisArrowHead1.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + STROKE_WIDTH);
	demandSupply_SvgGraph.append(yAxisArrowHead1);

  //Axial labels
  var xAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  xAxisLabel.setAttribute('x', node2X + 0.5 * MARGIN_FRACTION_AXES * actualLength);
	xAxisLabel.setAttribute('y', node1Y + 0.5 * MARGIN_FRACTION_AXES * actualLength);
	xAxisLabel.setAttribute('text-anchor', 'end');
	xAxisLabel.setAttribute('dominant-baseline', 'central');
	xAxisLabel.setAttribute('class', "editable");
  xAxisLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
	xAxisLabel.onclick = function(){
		demandSupplyTextClicked(self);
	};
	xAxisLabel.textContent = "Qty of";
	demandSupply_SvgGraph.append(xAxisLabel);

  var yAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  yAxisLabel.setAttribute('x', node0X - 0.5 * MARGIN_FRACTION_AXES * actualLength);
	yAxisLabel.setAttribute('y', node0Y - 0.5 * MARGIN_FRACTION_AXES * actualLength);
	yAxisLabel.setAttribute('text-anchor', 'start');
	yAxisLabel.setAttribute('dominant-baseline', 'central');
	yAxisLabel.setAttribute('class', "editable");
  yAxisLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
	yAxisLabel.onclick = function(){
		demandSupplyTextClicked(self);
	};
	yAxisLabel.textContent = "Price of";
	demandSupply_SvgGraph.append(yAxisLabel);

  //Drawing the lines
  let noOfDemandLines = (function(){
    if(demandShift === 0)
    {
      return 1;
    }
    else{
      return 2;
    }
  })();

  let noOfSupplyLines = (function(){
    if(supplyShift === 0)
    {
      return 1;
    }
    else{
      return 2;
    }
  })();

  //Structure: Multidimensional array of sets of x1,y1,x2,y2, with the number of sets of coordinates equal to the number of lines
  let demandLinesNodes = []
  let supplyLinesNodes = []

  for (var i = 0; i < noOfDemandLines; i++) {

    let xOffset = (function(){
      if(i === 0){
        return 0;
      }
      if(i === 1){
        return Math.abs(demandShift) * MARGIN_FRACTION_LINES * actualLength;
      }
    })();

    let x1 = node0X + xOffset;
    let y1 = node0Y + MARGIN_FRACTION_LINES * actualLength;
    let y2 = node1Y - MARGIN_FRACTION_LINES * actualLength;
    let x2 = node0Y + (y2 - y1) + xOffset;
    demandLinesNodes.push([x1, y2, x2, y2]);

    var demandLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  	demandLine.setAttribute('x1', x1);
  	demandLine.setAttribute('y1', y1);
  	demandLine.setAttribute('x2', x2);
  	demandLine.setAttribute('y2', y2);
  	demandLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 2);
  	demandSupply_SvgGraph.append(demandLine);

  }

  for (var i = 0; i < noOfSupplyLines; i++) {

    let xOffset = (function(){
      if(i === 0){
        return 0;
      }
      if(i === 1){
        return Math.abs(supplyShift) * MARGIN_FRACTION_LINES * actualLength;
      }
    })();

    let x1 = node0X + xOffset;
    let y1 = node1Y - MARGIN_FRACTION_LINES * actualLength;
    let y2 = node0Y + MARGIN_FRACTION_LINES * actualLength;
    let x2 = node0Y + (y1 - y2) + xOffset;
    supplyLinesNodes.push([x1, y2, x2, y2]);

    var supplyLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  	supplyLine.setAttribute('x1', x1);
  	supplyLine.setAttribute('y1', y1);
  	supplyLine.setAttribute('x2', x2);
  	supplyLine.setAttribute('y2', y2);
  	supplyLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 2);
  	demandSupply_SvgGraph.append(supplyLine);

  }

}

demandSupplyGraphDraw(
  localStorage.getItem("demandSupply_DemandChanges"),
  localStorage.getItem("demandSupply_SupplyChanges"),
  localStorage.getItem("demandSupply_PED"),
  localStorage.getItem("demandSupply_PES"));
