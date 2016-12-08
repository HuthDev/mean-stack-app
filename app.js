var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient

const pug = require('pug');

// "<p>Forbes's Pug source code!</p>"


app.get('/', function (req, res) {
  var cursor = db.collection('quotes').find().toArray(function(err, result) {
  	if(err) return console.log(err)


// Compile the source code
const compiledFunction = pug.compileFile('template.pug');

// Render a set of data
console.log(compiledFunction({
  name: 'Timothy'
}));
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
console.log(compiledFunction({
  name: 'Forbes'
}));

  })
})

app.post('/quotes', function (req, res) {
	db.collection('quotes').save(req.body, function (err, result) {
		if(err) return console.log(err)
		console.log('saved to database')
		res.redirect('/')
	})
})

app.put('/quotes', function(req, res) {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, function (err, result) {
    if (err) return res.send(err)
    res.send(result)
  })
})

var url = "mongodb://localhost:27017/myapp"

MongoClient.connect(url, function (err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function () {
    console.log('listening on 3000')
  })
})
