var width = 510;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width, height: height});

var g = svg.append('g')
  .attr('transform', 'translate(250, 65)');

g.append('circle')
  .attr({r: 35, cy: 0})
  .style({fill: '#e74c3c'});

g.append('circle')
  .attr({r: 35, cy: 70})
  .style({fill: '#f1c40f'});

g.append('circle')
  .attr({r: 35, cy: 140})
  .style({fill: '#2ecc71'});

