// Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');

// create instance of Express:
var app = express();
var PORT = process.env.PORT || 3000; // PORT for listener

// Morgan for more semantic and informative logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//app.use(express.static('./public'));
app.use(express.static(__dirname + '/public'));

// MongoDB configuration (Change this URL to your own DB)
var databaseUrl = "ReactSearches";
var collections = ["articles"];

// use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

db.on('error', function(err) {
  console.log('MongoDB Error: ', err);
});

// Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
// Main route which will redirect to the rendered React application
app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
});

app.get('/api/', function(req, res) {
  // descending order sort, limited to 5
  db.articles.find({}).sort({ 'date': -1 }).limit(5, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  }); // END db.articles.find
}); // END app.get

app.post('/save', function(req, res) {
  console.log(req.body);
}); // END app.post

// route for POST requests to save searches
app.post('/saveArticles', function(req, res) {
  console.log(req.body);
  // save articles returned from API into MongoDB
  req.body.articles.forEach(function(value, index) {
    // save location based on JSON input
    db.articles.insert({ "title": value.title, "pub_date": value.pub_date, "url": value.url, "date": Date.now() }, function(err, data) {
      if (err) throw err;
    });
  }); // END forEach
  // send articles to client-side
  db.articles.find({}).sort({ 'date': -1 }).limit(5, function(err, data) {
    if (err) throw err;
    else {
      res.json(data);
    }
  }); // END db.articles.find
}); // END app.post

// »»----------------------►
// listener:
app.listen(PORT, function() {
  console.log("Application listening on PORT: " + PORT);
});
