var width = 510;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width, height: height});

svg.append('rect')
  .attr({width: width, height: height})
  .style('fill', '#3498db');

// By the power of forloops!
var numColumns = 10;
var numRows = 8;
for(var i = 0; i < numColumns * numRows; i++) {
	svg.append('circle')
  	.style({
    	fill: '#2ecc71',
    	stroke: '#2980b9',
      'stroke-width': 10,
	  })
		.attr({
    	cx: i % numColumns * width / numColumns + 25,
    	cy: Math.floor(i / numColumns) * 50 + 110,
    	r: 25
  	});
}