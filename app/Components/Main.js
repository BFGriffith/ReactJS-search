var React = require('react');

// sub-components:
var Saved = require('./Children/Saved');
var Search = require('./Children/Search');
var Results = require('./Children/Results');

// HELPER functions:
var helpers = require('./utils/helpers.js');

// MAIN Component:
var Main = React.createClass({
  getInitialState: function(){
		return {
			search: "",
			start: "",
			end: "",
			someArticles: []
		};
	},	

	// function to allow children to update the parent
	setSearch: function(search) {
		this.setState({
			search: search
		});
	},
	setStart: function(start) {
		this.setState({
			start: start
		});
	},
	setEnd: function(end) {
		this.setState({
			end: end
		});
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
						});

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
											});
										}
									}.bind(this));
							}.bind(this));
					}
				}.bind(this));
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
					});
				}
			}.bind(this))
	},

	// RENDER:
	render: function(){
		return(

			<div className='container'>

				<div className='row'>
					<div className="col-xs-12">
            <br />
						<div className='panel panel-default mainHeaderContainer'>
						  <div className='panel-heading'>
							  <h1 className='text-center'>ReactJS &#10165; news SEARCH</h1>
							</div>
							<div className='panel-body'>
							  <h3 className='text-center'>Please enter your query parameters below.</h3>
							</div>
						</div>

          </div>
				</div>

				<div className="row">

					<div className="col-xs-12">
					
						<Search searchFunction={this.searchFunction} setSearch={this.setSearch} 
					  setStart={this.setStart} setEnd={this.setEnd} articles={this.state.someArticles}/>

					</div>

				</div>

			</div>
		)
	} // END render
}); // END Main

module.exports = Main;
