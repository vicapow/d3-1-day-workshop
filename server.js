'use strict'

var express = require('express')
var mkdirp = require('mkdirp')
var app = express()

app.post('/interactive/save/:slug', function(req, res, next) {

})

app.use(express.static(__dirname))

var server = app.listen(argv.port || 3000)