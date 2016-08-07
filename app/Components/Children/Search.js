// include React
var React = require('react');

var Search = React.createClass({
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Search</h3>
				</div>
				<div className="panel-body text-center">

						<h1>Results:</h1>
						<p>{this.props.results}</p>

				</div>
			</div>

		)
	}
});

module.exports = Search;
