var svg = d3.select('body').append('svg')
  .attr({width: 510, height: 600});

var g = svg.append('g')
  .attr('transform', 'translate(250, 65)');

var colors = ['#e74c3c', '#f1c40f', '#2ecc71'];

// selector of size 0.
var selector = g.selectAll('circle');
// selector of size 3; 3 datum, 0 <circle> tags.
selector = selector.data(colors);

// selector of size 3; 3 datum, 3 <circle> tags.
selector = selector.enter().append('circle')
    .attr({
      r: 35,
      cy: function(d, i) { return i * 70; },
    })
    .style('fill', function(d) { return d; });

// selector of size 3; 3 datum, 3 <circle> tags.
selector = g.selectAll('circle');