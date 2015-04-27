var width = 512;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width + 'px', height: height + 'px'});

svg.append('circle')
  .attr({
    r: 100,
    transform: 'translate(200, 200)'
  });