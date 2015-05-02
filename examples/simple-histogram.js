var width = 512;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width, height: height})
  .style('shape-rendering', 'crispEdges');

d3.csv('/data/iris.csv', function(err, data) {
  if (err) { throw err; }
  convertPropsToNumbers(data);
  var domain = d3.extent(data, function(d) {
    return d.sepalLength;
  });
  
  var scaleX = d3.scale.linear()
    .domain(domain)
    .range([30, width - 30]);

  var histogramLayout = d3.layout.histogram()
    .bins(13)
    .value(function(d) { return d.sepalLength; });

  var layoutData = histogramLayout(data);

  var maxBinCount = d3.max(layoutData, function(d) {
    return d.y;
  });

  var scaleY = d3.scale.linear()
    .domain([0, maxBinCount])
    .range([height - 100, 20]);

  var bar = svg.selectAll('.bar')
    .data(layoutData)
    .enter().append('g')
      .attr('class', 'bar')
      .attr('transform', function(d) {
        return 'translate(' +
          scaleX(d.x) + ',' + scaleY(d.y)
        + ')';
      });

  bar.append('rect')
    .attr('width', function(d) {
      return scaleX(d.y + d.dx) - scaleX(d.y) - 1;
    })
    .attr('height', function(d) {
      return scaleY.range()[0] - scaleY(d.y);
    }).style('fill', '#e67e22');
  
  var xTickValues = layoutData
    .map(function(d) { return d.x; });
  
  var axisX = svg.append('g')
    .attr('transform', 'translate(0, 500)')
    .call(d3.svg.axis()
    .scale(scaleX).tickValues(xTickValues))
    .call(styleAxis)
    .append('text')
      .attr('transform', 'translate(256, 40)')
      .style('text-anchor', 'middle')
      .text('sepal length');

  var axisY = svg.append('g')
    .attr('transform', 'translate(30, 0)')
    .call(d3.svg.axis().scale(scaleY).orient('left'))
    .call(styleAxis);

});

function styleAxis(axis) {
  axis.selectAll('path')
    .style('fill', 'none')
    .style('stroke', 'black');
  axis.selectAll('line')
    .style('stroke', 'black');
  axis.selectAll('text').style('font-size', 12);
}

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
