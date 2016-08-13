// include React
var React = require('react');
var helpers = require('../utils/helpers');
//var Search = require('./Search');

var Saved = React.createClass({

		getHistory: function() {
				return {
					"History": ""
				}
			},

    // RENDER to HTML
    render: function() {
		return (
      <div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title text-center">QUERY HISTORY:</h3>
					</div>
					<div className="panel-body text-center">
						{/* use a map function to loop through an array in JSX*/}
						{this.props.saved.map(function(search, i)
							{
								return <p key={i}>{search.title} - {search.date}</p> 
							}
						)}
					</div>
				</div>
			</div>
		)
	}
});

// »»-----------------►
module.exports = Saved;
