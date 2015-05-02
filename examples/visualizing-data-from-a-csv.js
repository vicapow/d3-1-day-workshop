var width = 512;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width, height: height});

d3.csv('/data/iris.csv', function(err, data) {
  if (err) { throw err; }
  var species = d3.nest()
    .key(function(d) { return d.species; })
    .entries(data);
  
  var speciesMeans = species.map(function(specii) {
    var mean = d3.mean(specii.values, function(d) {
      return d.sepalLength;
    });
    return {
      meanSepalLength: mean,
      species: specii.key,
    };
  });
  
  // Create and configure a new pie layout generator.
  var myPieLayout = d3.layout.pie()
    .value(function(d) { return d.meanSepalLength; });
  
  var layoutData = myPieLayout(speciesMeans);
  
  // Arc is a generator that takes a single item 
  // from layout and generates the proper `d` 
  // attribute to create an arc.
  var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(140);
  
  svg.append('g')
    .attr('transform', 'translate(269, 200)')
    .selectAll('path').data(layoutData)
    .enter().append('path')
    .attr({
      d: arc,
      fill: color,
      stroke: 'rgba(0, 0, 0, 0.1)',
      'stroke-width': 4,
    });
});

function color(d) {
  if (d.data.species === 'setosa') {
    return '#2ecc71';
  } else if(d.data.species === 'versicolor') {
    return '#3498db';
  }
  return '#e74c3c';
}
