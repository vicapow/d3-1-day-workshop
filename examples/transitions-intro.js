var width = 512;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width + 'px', height: height + 'px'});

var r = 10
svg.append('circle')
  .attr({r: r, transform: 'translate(200, 0)'})
  .transition()
  .duration(1000)
  .ease('bounce')
  .attr({
    r: r,
    transform: 'translate(200, ' + (height - r) + ')'
  })