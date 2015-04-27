var width = 500;
var height = 550;
var svg = d3.select('body').append('svg')
  .attr({width: width + 'px', height: height + 'px'});

var n = 5
var flower = svg.append('g')

flower.append('path')
  .style({
    stroke: 'black',
    'stroke-width': 20,
    fill: 'none',
  })
  .attr('d', 'M0,0 L-40,200 L20,600')

flower.attr('transform', function() {
    var pos = [
      d3.round(width / 2, 2),
      d3.round(height * 0.25, 2)
    ];
    return 'translate(' + pos + ')';
   });

flower.selectAll('g')
  .data(d3.range(n)).enter().append('g')
    .attr('transform', function(d) {
      var rotation = d3.round(d / n * 360, 2);
      return 'rotate(' + rotation + ')';
    })
    .append('circle')
    .attr({
      r: 60,
      transform: 'translate(40, 0) scale(1.5, 1)',
      fill: '#f1c40f',
    })

flower.append('circle')
  .attr({r: 60, fill: '#f39c12'})