var width = 512;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width, height: height});

svg.append('rect')
  .attr({width: width, height: height})
  .style({fill: '#34495e'});

svg.append('g').attr({transform: 'translate(125, 200)'})
  .append('circle')
  .attr({r: 100, })
  .style({fill: '#f1c40f'});

svg.append('g').attr({transform: 'translate(375, 200)'})
  .append('circle')
  .attr({r: 100, })
  .style({fill: '#f1c40f'});

var month = svg.append('rect')
  .style({fill: '#f1c40f'})
  .attr({y:0, x:-50, width: 100, height: 20})
  .attr({transform: 'translate(256, 300) scale(1, 1)'})
  .transition()
  .duration(600)
  .ease('bounce')
  .attr({
    transform: 'translate(256, 300) scale(1, 10)'
  });

var eyes = svg.selectAll('circle')
  .transition()
  .duration(100)
  .delay(1000)
  .attr({transform: 'scale(1, 0.01)'})
  .transition()
  .duration(100)
  .attr({transform: 'scale(1, 1)'});





  


