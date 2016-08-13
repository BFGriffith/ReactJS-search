// include React
var React = require('react');
var helpers = require('../utils/helpers');
var Results = require('./Results');

var Search = React.createClass({

	// default generic state
	getInitialState: function() {
		return {
			querySearch: "",
			start: "",
			end: "",
			"articles": [],
		};
	},

	handleChange: function(event) {
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	console.log(newState);
    	this.setState(newState);
	},

	// SEARCH:
	handleClick: function(e) {
		e.preventDefault();
		// pass search parameters to Main.js (parent) file 
		this.props.setSearch(this.state.querySearch);
		this.props.setStart(this.state.start);
		this.props.setEnd(this.state.end);
		// execute API search:
		helpers.runQuery(this.state.querySearch, this.state.start, this.state.end)
			.then(function(data) {
				// console.log(data);
				// send POST to save the data from API search
				$.ajax({
					method: 'post',
					url: '/saveArticles',
					data: {"articles": data},
				}).done(function(data) {
					console.log(data);
					this.state.articles = []; // remove previous articles in state articles array
					// update the state articles with the new results returned from server side
					var updatedArticles = this.state.articles.concat(data);
					// Set the new results to the articles state array
					this.setState({articles: updatedArticles});
					console.log(this.state);
				}.bind(this));
			}.bind(this));
	},

	// RENDER to HTML
	render: function() {
		return (
			<div className='all'>
			<div className='panel panel-default'>
				<div className='panel-heading'>
				<h1 className='panel-title text-center'>New York Times SEARCH:</h1>
				</div>
				<div className='panel-body text-center'>
					<form>
							<div className='form-group'>
                <h4 className=''>QUERY:</h4>
								<input type='text' className='form-control text-center' id='queryInput' onChange= {this.handleChange} required/>
								<br />
                <h4 className=''>starting year:</h4>
								<input type='text' className='form-control text-center' id='start' onChange= {this.handleChange} required/>
								<br />
                <h4 className=''>ending year:</h4>
								<input type='text' className='form-control text-center' id='end' onChange= {this.handleChange} required/>
								<br />
								<button type='button' className='btn btn-info' onClick={this.handleClick}>SEARCH</button>
							</div>
						</form>
				</div>
			</div>
				<Results results={this.state.articles}/>
			</div>
		)
	}
});

// »»------------------►
module.exports = Search;
