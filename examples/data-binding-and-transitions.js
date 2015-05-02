var width = 512;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width + 'px', height: height + 'px'});
var color = d3.scale.category10()

svg.selectAll('circle').data(d3.range(100))
  .enter()
  .append('circle')
  .attr({
    r: function() { return Math.random() * 40 + 40 },
    transform: function() {
      var pos = [
        width * Math.random(),
        height * Math.random()
      ]
      return 'translate(' + pos + ')'
    },
  }).style({
    fill: function(d, i) { return color(i) },
    'fill-opacity': 0.0,
  })
  .transition()
  .duration(1000)
  .ease('cubic-out')
  .attr({
    r: function() { return Math.random() * 10 },
    transform: function() {
      var pos = [
        width * Math.random(),
        height * Math.random()
      ]
      return 'translate(' + pos + ')'
    },
  }).style('fill-opacity', 0.4);
