
function templateModifier(template) {
  template = template.replace(
    '/scripts/d3.v3.js',
    window.location.origin + '/scripts/d3.v3.js'
  )
  template = template.replace(
    '/data/setosa.csv',
    window.location.origin + '/data/setosa.csv'
  )
  return template
}