// axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// New York Times API
var NewYorkTimesAPI = '9bbae09731dd4fecbf60aa31e137a3b9';

// HELPER functions:
var helpers = {

  runQuery: function(query, start, end) {
    // build queryURL for New York Times API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NewYorkTimesAPI + "&q=";
    queryURL += query;
    queryURL += "&begin_date=" + start + "2015";
    queryURL += "&end_date=" + end + "2016";

    return axios.get(queryURL)
      .then(function(nytimes_data) {
        var articles = nytimes_data.data.response.docs; // store articles returned
        // build object for each article
        var articles_obj_array = articles.map(function(article, index) {
          var articlesObject = {
            title: article.headline.main,
            pub_date: article.pub_date,
            url: article.web_url
          };
          return articlesObject;
        });
        // return the object for access using .then
        return articles_obj_array;
      });
  },

  getArticles: function() {
    // use axios to access the get route in server.js and return articles from MongoDB
    return axios.get('/api')
      .then(function(response) {
        return response; // for access in the Main component
      });
  },

  // hit server to retrieve record of query results
  getHistory: function() {
    return axios.get('/api/')
      .then(function(response) {
        return response;
      });
  },

  // post new searches to database
  postHistory: function(location) {
    return axios.post('/api/', { location: location })
      .then(function(results) {
        console.log("posted to MongoDB");
        return (results);
      });
  }

}; // END helpers

module.exports = helpers;
