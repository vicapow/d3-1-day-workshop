var width = 512;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width, height: height});
var color = d3.scale.category10();

d3.csv('/data/iris.csv', function(err, data) {
  if (err) { throw err; }
  convertPropsToNumbers(data);
  var domain = d3.extent(data, function(d) {
    return d.sepalLength;
  });
  var scale = d3.scale.linear()
    .domain(domain)
    .range([20, width - 20]);
  data.sort(function(a, b) {
    return a.sepalLength - b.sepalLength;
  });
  svg.selectAll('circle').data(data)
    .enter().append('circle')
      .attr({
        r: 3,
        cx: function(d) {
          return scale(d.sepalLength);
        },
        cy: function(d, i) { return 3 * i + 30; },
       }).style({
        fill: function(d) { return color(d.species); },
        opacity: 1,
      });
  var axis = d3.svg.axis().scale(scale);
  var axisG = svg.append('g')
    .attr('transform', 'translate(0, 500)')
    .style('shape-rendering', 'crispEdges')
    .style('font-size', 14);
  axis(axisG); // Same as axisG.call(axis)
  axisG.selectAll('path')
    .style('fill', 'none')
    .style('stroke', 'black');
  axisG.selectAll('line')
    .style('stroke', 'black');
  axisG.append('text')
    .attr('transform', 'translate(256, 40)')
    .style('text-anchor', 'middle')
    .text('sepal length');
});


function convertPropsToNumbers(data) {
   // convert string properties to numbers.
  data.forEach(function(d) {
    for(prop in d) {
      if (prop !== 'species') {
        d[prop] = Number(d[prop]);
      }
    }
  });
  return data;
}
