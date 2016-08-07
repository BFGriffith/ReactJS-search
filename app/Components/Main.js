var React = require('react');

// sub-components:
var Search = require('./Children/Search');
var Saved = require('./Children/Saved');

// Helper Functions:
var helpers = require('./utils/helpers.js');

// MAIN Component:
var Main = React.createClass({
  getInitialState: function(){
		return {
			searchTerm: "",
			results: "",
			history: []
		}
	},

	// function to allow children to update the parent
	setTerm: function(term){
		this.setState({
			searchTerm: term
		})
	},

	// if the component changes (i.e. if a search is entered)...
	componentDidUpdate: function(prevProps, prevState){
		if(prevState.searchTerm != this.state.searchTerm){
			console.log("UPDATED");

			// run query
			helpers.runQuery(this.state.searchTerm)
				.then(function(data){
					if (data != this.state.results)
					{
						//console.log("term", data);

						this.setState({
							results: data
						})

						// once result is received, post the search term to history
						helpers.postHistory(this.state.searchTerm)
							.then(function(data){
								console.log("Updated!");

								// after the post, get the updated history
								helpers.getHistory()
									.then(function(response){
										console.log("Current History", response.data);
										if (response != this.state.history){
											console.log ("History", response.data);

											this.setState({
												history: response.data
											})
										}
									}.bind(this))
							}.bind(this)
						)
					}
				}.bind(this))

			}
	},

	// when the page renders, get the History
	componentDidMount: function(){
		// get the latest history
		helpers.getHistory()
			.then(function(response){
				if (response != this.state.history){
					console.log ("History", response.data);

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},

	// RENDER:
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center">SEARCH</h2>
						<p className="text-center"><em>Enter your query parameters.</em></p>
					</div>

				</div>

			</div>
		)
	}
});
}); // END Main

module.exports = Main;
