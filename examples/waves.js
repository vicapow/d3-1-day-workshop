var width = 512;
var height = 600;
var svg = d3.select('body').append('svg')
  .attr({width: width, height: height});

svg.append('rect')
  .attr({width: width, height: height})
  .style('fill', '#3498db');

function createWavePath(waveW, waveH, repeatCount) {
  var w = waveW, h = waveH;
  var offset = 0;
  var path = 'M ' + [offset, waveH] + ' L ' + [offset, 0]
  for(var i = 0; i < repeatCount; i++) {
    path += ['Q', [offset + w / 2, h], [offset + w, 0],].join(' ');
    offset += w;
  }
  path += 'L' + [offset, h];
  return path;
}

var waves = svg.selectAll('.wave').data(d3.range(23))
  .enter().append('g')
    .attr('class', 'wave')
    .style('stroke', 'rgba(0, 0, 0, 0.7)')
    .style('stroke-width', 4)
    .style('fill', '#3498db');

var w = 150, h = 100;
var horSpacing = 31;
var horOffset = 0;
waves.append('path').attr('d', createWavePath(w, h, 5));

function animateWave(wave) {
  wave
    .attr('transform', function(d) {
      return 'translate(' +
        [d % 2 ? 0 : -w, horSpacing * d - horOffset]
      + ')'
  	})
	  .transition()
		.duration(function(d) { return 8000 + d * 5000 })
		.ease('linear')
		.attr('transform', function(d) {
  		return 'translate(' + [d % 2 ? -w : 0, horSpacing * d - horOffset] + ')' 
		})
    .each('end', function() {
    	d3.select(this).call(animateWave);
	  });
}

waves.call(animateWave)
