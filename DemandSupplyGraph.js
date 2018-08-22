let demandSupply_SvgGraph = $("#demand_supply_svg_graph");
let demandSupply_Attributes = $("#demand_supply_attributes");

demandSupply_Attributes.load("demand_supply_attributes_starting.html");

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

  var zeroLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  zeroLabel.setAttribute('x', node1X - 2);
	zeroLabel.setAttribute('y', node1Y + 2);
	zeroLabel.setAttribute('text-anchor', 'end');
	zeroLabel.setAttribute('dominant-baseline', 'hanging');
	zeroLabel.setAttribute('class', "editable");
  zeroLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
	zeroLabel.onclick = function(){
		demandSupplyTextClicked(this);
	};
	zeroLabel.textContent = "0";
	demandSupply_SvgGraph.append(zeroLabel);

  //Axial labels
  var xAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  xAxisLabel.setAttribute('x', node2X + 0.5 * MARGIN_FRACTION_AXES * actualLength);
	xAxisLabel.setAttribute('y', node1Y + 0.5 * MARGIN_FRACTION_AXES * actualLength);
	xAxisLabel.setAttribute('text-anchor', 'end');
	xAxisLabel.setAttribute('dominant-baseline', 'central');
	xAxisLabel.setAttribute('class', "editable");
  xAxisLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
	xAxisLabel.onclick = function(){
		demandSupplyTextClicked(this);
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
		demandSupplyTextClicked(this);
	};
	yAxisLabel.textContent = "Price of";
	demandSupply_SvgGraph.append(yAxisLabel);

  //Drawing the lines
  let noOfDemandLines = (function(){
    if(parseInt(demandShift) === 0)
    {
      return 1;
    }
    else{
      return 2;
    }
  })();

  let noOfSupplyLines = (function(){
    if(parseInt(supplyShift) === 0)
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

    //returns [x1, y1, x2, y2]
    let elasticityAdjustedCoords = demandSupplyChangeLineElasticity(x1, y1, x2, y2, ped, true);

    var demandLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  	demandLine.setAttribute('x1', elasticityAdjustedCoords[0]);
  	demandLine.setAttribute('y1', elasticityAdjustedCoords[1]);
  	demandLine.setAttribute('x2', elasticityAdjustedCoords[2]);
  	demandLine.setAttribute('y2', elasticityAdjustedCoords[3]);
  	demandLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 2);
  	demandSupply_SvgGraph.append(demandLine);

    var ddLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    ddLabel.setAttribute('x', elasticityAdjustedCoords[2] + 2);
    ddLabel.setAttribute('y', elasticityAdjustedCoords[3]);
    ddLabel.setAttribute('text-anchor', 'start');
    ddLabel.setAttribute('dominant-baseline', 'central');
    ddLabel.setAttribute('class', "editable");
    ddLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
    ddLabel.onclick = function(){
      demandSupplyTextClicked(this);
    };

    //Demand increase. D2 to the right of D1.
    if(parseInt(demandShift) >= 0){
    	ddLabel.textContent = "D" + (i + 1);
      demandLinesNodes.push(elasticityAdjustedCoords);
    }
    //Demand decrease. D1 to the right of D2.
    else if(parseInt(demandShift) < 0){
    	ddLabel.textContent = "D" + (-i + 2);
      demandLinesNodes.unshift(elasticityAdjustedCoords);
    }
    demandSupply_SvgGraph.append(ddLabel);

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

    let elasticityAdjustedCoords = demandSupplyChangeLineElasticity(x1, y1, x2, y2, pes, false);

    var supplyLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  	supplyLine.setAttribute('x1', elasticityAdjustedCoords[0]);
  	supplyLine.setAttribute('y1', elasticityAdjustedCoords[1]);
  	supplyLine.setAttribute('x2', elasticityAdjustedCoords[2]);
  	supplyLine.setAttribute('y2', elasticityAdjustedCoords[3]);
  	supplyLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 2);
  	demandSupply_SvgGraph.append(supplyLine);

    var ssLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    ssLabel.setAttribute('x', elasticityAdjustedCoords[2] + 2);
    ssLabel.setAttribute('y', elasticityAdjustedCoords[3]);
    ssLabel.setAttribute('text-anchor', 'start');
    ssLabel.setAttribute('dominant-baseline', 'central');
    ssLabel.setAttribute('class', "editable");
    ssLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
    ssLabel.onclick = function(){
      demandSupplyTextClicked(this);
    };

    //Demand increase. D2 to the right of D1.
    if(parseInt(supplyShift) >= 0){
    	ssLabel.textContent = "S" + (i + 1);
      supplyLinesNodes.push(elasticityAdjustedCoords);
    }
    //Demand decrease. D1 to the right of D2.
    else if(parseInt(supplyShift) < 0){
    	ssLabel.textContent = "S" + (-i + 2);
      supplyLinesNodes.unshift(elasticityAdjustedCoords);
    }
    demandSupply_SvgGraph.append(ssLabel);

  }

  //Drawing the labels and intersections
  /*
  DD Shift | SS Shift | No. of intersections | intersections
  False      False      1                      D1 & S1
  True       False      2                      D1 & S1, D2 & S1
  False      True       2                      D1 & S1, D1 & S2
  True       True       2                      D1 & S1, D2 & S2
  */

  var intersections = [];

  intersections.push(checkLineIntersection(demandLinesNodes[0], supplyLinesNodes[0], 1));
  if(noOfDemandLines === 2 && noOfSupplyLines === 1){
    intersections.push(checkLineIntersection(demandLinesNodes[1], supplyLinesNodes[0], 2));
  }
  else if(noOfDemandLines === 1 && noOfSupplyLines === 2){
    intersections.push(checkLineIntersection(demandLinesNodes[0], supplyLinesNodes[1], 2));
  }
  else if(noOfDemandLines === 2 && noOfSupplyLines === 2){
    intersections.push(checkLineIntersection(demandLinesNodes[1], supplyLinesNodes[1], 2));
  }

  if(intersections.length === 1){

    var quantityLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    quantityLine.setAttribute('x1', intersections[0].x);
    quantityLine.setAttribute('y1', intersections[0].y);
    quantityLine.setAttribute('x2', intersections[0].x);
    quantityLine.setAttribute('y2', node1Y);
    quantityLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 1 + ";stroke-dasharray:4");
    demandSupply_SvgGraph.append(quantityLine);

    var quantityLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    quantityLabel.setAttribute('x', intersections[0].x);
    quantityLabel.setAttribute('y', node1Y + 4);
    quantityLabel.setAttribute('text-anchor', 'middle');
    quantityLabel.setAttribute('dominant-baseline', 'hanging');
    quantityLabel.setAttribute('class', "editable");
    quantityLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
    quantityLabel.textContent = "Q";
    quantityLabel.onclick = function(){
      demandSupplyTextClicked(this);
    };
    demandSupply_SvgGraph.append(quantityLabel);

    var priceLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    priceLine.setAttribute('x1', intersections[0].x);
    priceLine.setAttribute('y1', intersections[0].y);
    priceLine.setAttribute('x2', node1X);
    priceLine.setAttribute('y2', intersections[0].y);
    priceLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 1 + ";stroke-dasharray:4");
    demandSupply_SvgGraph.append(priceLine);

    var priceLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    priceLabel.setAttribute('x', node1X - 8);
    priceLabel.setAttribute('y', intersections[0].y);
    priceLabel.setAttribute('text-anchor', 'end');
    priceLabel.setAttribute('dominant-baseline', 'central');
    priceLabel.setAttribute('class', "editable");
    priceLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
    priceLabel.textContent = "P";
    priceLabel.onclick = function(){
      demandSupplyTextClicked(this);
    };
    demandSupply_SvgGraph.append(priceLabel);

  }

  if(intersections.length === 2){
    //Only label and draw the line if there has been no lines drawn at the same coordinates
    if(intersections[0].x == intersections[1].x){
      var quantityLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      quantityLine.setAttribute('x1', intersections[0].x);
      quantityLine.setAttribute('y1', Math.min(intersections[0].y, intersections[1].y));
      quantityLine.setAttribute('x2', intersections[0].x);
      quantityLine.setAttribute('y2', node1Y);
      quantityLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 1 + ";stroke-dasharray:4");
      demandSupply_SvgGraph.append(quantityLine);

      var quantityLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      quantityLabel.setAttribute('x', intersections[0].x);
      quantityLabel.setAttribute('y', node1Y + 4);
      quantityLabel.setAttribute('text-anchor', 'middle');
      quantityLabel.setAttribute('dominant-baseline', 'hanging');
      quantityLabel.setAttribute('class', "editable");
      quantityLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
      quantityLabel.textContent = "Q";
      quantityLabel.onclick = function(){
        demandSupplyTextClicked(this);
      };
      demandSupply_SvgGraph.append(quantityLabel);
    }

    if(intersections[0].y == intersections[1].y){
      var priceLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      priceLine.setAttribute('x1', Math.max(intersections[0].x, intersections[1].x));
      priceLine.setAttribute('y1', intersections[0].y);
      priceLine.setAttribute('x2', node1X);
      priceLine.setAttribute('y2', intersections[0].y);
      priceLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 1 + ";stroke-dasharray:4");
      demandSupply_SvgGraph.append(priceLine);

      var priceLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      priceLabel.setAttribute('x', node1X - 8);
      priceLabel.setAttribute('y', intersections[0].y);
      priceLabel.setAttribute('text-anchor', 'end');
      priceLabel.setAttribute('dominant-baseline', 'central');
      priceLabel.setAttribute('class', "editable");
      priceLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
      priceLabel.textContent = "P";
      priceLabel.onclick = function(){
        demandSupplyTextClicked(this);
      };
      demandSupply_SvgGraph.append(priceLabel);
    }

    for(var i = 0; i < intersections.length; i++){

      var eqmLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      eqmLabel.setAttribute('x', intersections[i].x + 10);
      eqmLabel.setAttribute('y', intersections[i].y);
      eqmLabel.setAttribute('text-anchor', 'start');
      eqmLabel.setAttribute('dominant-baseline', 'central');
      eqmLabel.setAttribute('class', "editable");
      eqmLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
      eqmLabel.textContent = "E" + intersections[i].index;
      eqmLabel.onclick = function(){
        demandSupplyTextClicked(this);
      };
      demandSupply_SvgGraph.append(eqmLabel);

      if(intersections[0].x != intersections[1].x){
        var quantityLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      	quantityLine.setAttribute('x1', intersections[i].x);
      	quantityLine.setAttribute('y1', intersections[i].y);
      	quantityLine.setAttribute('x2', intersections[i].x);
      	quantityLine.setAttribute('y2', node1Y);
      	quantityLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 1 + ";stroke-dasharray:4");
      	demandSupply_SvgGraph.append(quantityLine);

        var quantityLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        quantityLabel.setAttribute('x', intersections[i].x);
        quantityLabel.setAttribute('y', node1Y + 4);
        quantityLabel.setAttribute('text-anchor', 'middle');
        quantityLabel.setAttribute('dominant-baseline', 'hanging');
        quantityLabel.setAttribute('class', "editable");
        quantityLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
        quantityLabel.textContent = "Q" + intersections[i].index;
        quantityLabel.onclick = function(){
          demandSupplyTextClicked(this);
        };
        demandSupply_SvgGraph.append(quantityLabel);

      }

      if(intersections[0].y != intersections[1].y){
        var priceLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      	priceLine.setAttribute('x1', intersections[i].x);
      	priceLine.setAttribute('y1', intersections[i].y);
      	priceLine.setAttribute('x2', node1X);
      	priceLine.setAttribute('y2', intersections[i].y);
      	priceLine.setAttribute('style', "stroke:" + COLOR + ";stroke-width:" + 1 + ";stroke-dasharray:4");
      	demandSupply_SvgGraph.append(priceLine);

        var priceLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        priceLabel.setAttribute('x', node1X - 8);
        priceLabel.setAttribute('y', intersections[i].y);
        priceLabel.setAttribute('text-anchor', 'end');
        priceLabel.setAttribute('dominant-baseline', 'central');
        priceLabel.setAttribute('class', "editable");
        priceLabel.setAttribute('style', "fill: " + COLOR + "; font-size: " + '22px' + ";");
        priceLabel.textContent = "P" + intersections[i].index;
        priceLabel.onclick = function(){
          demandSupplyTextClicked(this);
        };
        demandSupply_SvgGraph.append(priceLabel);

      }

    }

  }

}

function demandSupplyChangeLineElasticity(x1, y1, x2, y2, elasticity, isDemand){

  var newX1 = 0;
  var newY1 = 0;
  var newX2 = 0;
  var newY2 = 0;

  if(isDemand){

  	if(elasticity < 0){
      newY1 = y1;
      newY2 = y2;
      newX1 = x1 - elasticity * (x2 - x1) / 8;
      newX2 = x2 + elasticity * (x2 - x1) / 8;
      return [newX1, newY1, newX2, newY2];
    }

    else if(elasticity > 0){
      newX1 = x1;
      newX2 = x2;
      newY1 = y1 + elasticity * (y2 - y1) / 8;
      newY2 = y2 - elasticity * (y2 - y1) / 8;
      return [newX1, newY1, newX2, newY2];
    }

    else{
      return [x1, y1, x2, y2];
    }

  }

  else{

  	if(elasticity < 0){
      newY1 = y1;
      newY2 = y2;
      newX1 = x1 - elasticity * (x2 - x1) / 8;
      newX2 = x2 + elasticity * (x2 - x1) / 8;
      return [newX1, newY1, newX2, newY2];
    }

    else if(elasticity > 0){
      newX1 = x1;
      newX2 = x2;
      newY1 = y1 - elasticity * (y1 - y2) / 8;
      newY2 = y2 + elasticity * (y1 - y2) / 8;
      return [newX1, newY1, newX2, newY2];
    }

    else{
      return [x1, y1, x2, y2];
    }

  }

}

function checkLineIntersection(dd, ss, index) {

  let line1StartX = dd[0];
  let line1StartY = dd[1];
  let line1EndX = dd[2];
  let line1EndY = dd[3];

  let line2StartX = ss[0];
  let line2StartY = ss[1];
  let line2EndX = ss[2];
  let line2EndY = ss[3];

  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
	var denominator, a, b, numerator1, numerator2, result = {
		index: null,
		x: null,
		y: null,
	};
	denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
	if (denominator == 0) {
		return result;
	}
	a = line1StartY - line2StartY;
	b = line1StartX - line2StartX;
	numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
	numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
	a = numerator1 / denominator;
	b = numerator2 / denominator;

	// if we cast these lines infinitely in both directions, they intersect here:
	result.x = line1StartX + (a * (line1EndX - line1StartX));
	result.y = line1StartY + (a * (line1EndY - line1StartY));
  result.index = index;

	// if line1 and line2 are segments, they intersect if both of the above are true
	return result;
};

function demandSupplyTextClicked(labelClicked){

  demandSupply_Attributes.load("demand_supply_attributes_edit_text.html", function() {

    let labelText = $("#label_text");
    labelText.val(labelClicked.textContent);

    labelText.on('input', function() {
			labelClicked.textContent = labelText.val();
		});

  });

}

demandSupplyGraphDraw(
  localStorage.getItem("demandSupply_DemandChanges"),
  localStorage.getItem("demandSupply_SupplyChanges"),
  localStorage.getItem("demandSupply_PED"),
  localStorage.getItem("demandSupply_PES"));
