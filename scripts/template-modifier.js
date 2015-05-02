
function templateModifier(template) {
  var base = '.'
  if (window.location.origin.indexOf('localhost') !== -1) {
    base = window.location.origin;
  }
  template = template.replace('/scripts/d3.v3.js', base + '/scripts/d3.v3.js')
  template = template.replace('/data/iris.csv', base + '/data/iris.csv')
  return template
}