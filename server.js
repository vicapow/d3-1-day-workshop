'use strict'
var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var mkdirp = require('mkdirp')
var app = express()
var bodyParser = require('body-parser')
var argv = require('minimist')(process.argv.slice(2))

mkdirp.sync(path.join(__dirname, 'examples'))

var textParser = bodyParser.text({type: 'text/*'})
app.post('/examples/:slug.js', textParser, save.bind(this, 'js'))
app.post('/examples/:slug.html', textParser, save.bind(this, 'html'))

function save(ext, req, res, next) {
  if (!req.body) return res.sendStatus(400)
  var body = req.body
  var filename = path.join('examples/', req.params.slug + '.' + ext)
  if (ext === 'js') body = body.replace('\t', '  ')
  fs.writeFile(filename, body, function(err) {
    if (err) return next(err)
    res.sendStatus(200)
  })
}

app.use(express.static(__dirname))

var server = app.listen(argv.port || 3000)