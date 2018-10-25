import React from 'react';
import '../css/search.css'
// import { connect } from 'react-redux';
import SearchResults from './search_results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            searchTerm: '', 
            dailyTrends: [], 
            dailyTrends2: [],
            renderResults: false 
        };
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentDidMount() {
       
    }

    submitSearch(searchTerm) {
        // let searchTerm = searchTermInput || document.getElementById('search-input').value;
        // logic/call method for sending term to calls
        this.setState({renderResults: true, searchTerm: document.getElementById('search-input').value})
    }

    render() {
        let { dailyTrends, dailyTrends2, searchTerm } = this.state;

        let trendButtons = [];
        for(let i = 0; i < dailyTrends.length; i++) {
            let btn = <button className="trend-btn animated slideInLeft" onClick={this.submitSearch(dailyTrends[i])}> {dailyTrends[i]} </button>
            trendButtons.push(btn);
        }

        let trendButtons2 = [];
        for(let i = 0; i < dailyTrends2.length; i++) {
            let btn = <button className="trend-btn animated slideInLeft" onClick={this.submitSearch(dailyTrends2[i])}> {dailyTrends2[i]} </button>
            trendButtons2.push(btn);
        }

        // let results = ''
        let results = this.state.renderResults ? (
            <SearchResults searchTerm={searchTerm} />
        ) : (
            <div>Nothing to see here</div>
        )

        return (
            <div>
                <div className="search">
                    <form onSubmit={this.submitSearch} className="search-input">
                        <input 
                            className="search-bar"
                            id="search-input"
                            autoFocus="autoFocus"
                            type="text"
                            placeholder="See what's trending..."></input>
                    
                    <button type="submit" className="search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                    </form>
                </div>
                
                <div className="trends">
                    {trendButtons}
                </div>

                { results }
            </div>
        )
    }
}

export default Search;
