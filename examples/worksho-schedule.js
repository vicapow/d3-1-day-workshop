var width = 512;
var height = 400;
var padding = 30;
var margin = {
  left: padding,
  top: 30,
  right: padding,
  bottom: 50,
};

var svg = d3.select('body').append('svg')
  .attr({width: width + 'px', height: height + 'px'})
  .style('font-family', "'Helvetica Neue', Helvetica, Arial, sans-serif");

var schedule = [
  {start: 9, end: 10, label: 'Coffee and Pasteries', type: 'break'},
  {start: 10, end: 12.00, label: 'Session 1', type: 'session'},
  {start: 12.00, end: 12.75, label: 'Lunch', type: 'break'},
  {start: 12.75, end: 14.25, label: 'Session 2', type: 'session'},
  {start: 14.25, end: 14.5, label: 'break', type: 'break'},
  {start: 14.5, end: 16, label: 'Session 3', type: 'session'}
];

function color(type) {
  if (type === 'session') return '#428bca'
  else return '#a4c1d7'
}

var x = d3.scale.linear()
  .domain([9, 16])
  .range([margin.left, width - margin.right]);

var y = d3.scale.linear()
  .domain([0, schedule.length - 0.5])
  .range([margin.top, height - margin.bottom]);

var axis = d3.svg.axis().scale(x)
  .ticks(6)
  .tickFormat(function(d) {
    return d <= 12 ? d + 'am' : (d - 12) + 'pm';
  });

svg.append('g')
  .attr('transform', 'translate(0, ' + (height - margin.bottom) + ')')
  .style({
    fill: 'none',
    stroke: 'black',
    'shape-rendering': 'crispEdges',
  })
  .call(axis)
  .selectAll('text')
  .style({
    fill: 'black',
  	stroke: 'none',
  	'font-size': '12px'
	});

svg.append('g')
  .selectAll('path').data(schedule)
  .enter().append('path')
  .attr('d', function(d, i) {
    return 'M' + [x(d.start), y(i)] + 'L' + [x(d.end), y(i)]
  }).style({
    stroke: function(d) { return color(d.type) },
    'stroke-width': 13
  })

svg.append('g').selectAll('text')
  .data(schedule).enter().append('text')
  .attr({
    transform: function(d, i) {
      return 'translate(' + [ x(d.start) + (x(d.end) - x(d.start)) / 2, y(i) - 11] + ')'
    },
    'text-anchor': 'middle',
    'font-size': '12px',
  }).text(function(d) { return d.label })

svg.append('g').selectAll('text')
  .data(schedule).enter().append('text')
  .attr({
    transform: function(d, i) {
      return 'translate(' + [ x(d.start) + (x(d.end) - x(d.start)) / 2, y(i) + 21] + ')'
    },
    'text-anchor': 'middle',
    'font-size': '10px',
  }).text(function(d) { return d3.round((d.end - d.start) * 60, 2) + 'm' });

