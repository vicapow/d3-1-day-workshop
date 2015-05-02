
function templateModifier(template) {
  var base = '.'
  if (window.location.origin.indexOf('localhost') !== -1) {
    base = window.location.origin;
  }
  template = template.replace(
    '/scripts/d3.v3.js',
    window.location.origin + '/scripts/d3.v3.js'
  )
  template = template.replace(
    '/data/iris.csv',
    window.location.origin + '/data/iris.csv'
  )
  return template
}