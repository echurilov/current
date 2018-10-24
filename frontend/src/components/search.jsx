import React from 'react';
import '../css/search.css'
// import { connect } from 'react-redux';
// import SearchResults from './search_results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', render: false };
        this.submitSearch = this.submitSearch.bind(this);
    }


    submitSearch(searchTermInput) {
        let searchTerm = searchTermInput || document.getElementById('search-input').value;
        // logic/call method for sending term to calls
    }

    render() {
        let { render } = this.state;

        let dailyTrends = ['Ariana Grande', 'Westminster Dog Show', 'World Cup', 'Piperade']
        let dailyTrends2 = ['Matt Damon', 'The Warriors', 'Voter Registration', 'Supreme Court']
        let dailyTrends3 = ['Amazon Go', 'Halloween', 'Game of Thrones', 'Haunted Houses', 'Drake']

        let trendButtons = [];
        for(let i = 0; i < dailyTrends.length; i++) {
            let btn = <button className="trend-btn" onClick={this.submitSearch(dailyTrends[i])}> {dailyTrends[i]} </button>
            trendButtons.push(btn);
        }

        let trendButtons2 = [];
        for(let i = 0; i < dailyTrends2.length; i++) {
            let btn = <button className="trend-btn" onClick={this.submitSearch(dailyTrends2[i])}> {dailyTrends2[i]} </button>
            trendButtons2.push(btn);
        }

        let trendButtons3 = [];
        for(let i = 0; i < dailyTrends3.length; i++) {
            let btn = <button className="trend-btn" onClick={this.submitSearch(dailyTrends3[i])}> {dailyTrends3[i]} </button>
            trendButtons3.push(btn);
        }

        let results = 'result'
        // let results = <SearchResults searchTerm={searchTerm} />

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
                    <div className="item-1">
                        {trendButtons}
                    </div>
                    <div className="item-2">
                        {trendButtons2}
                    </div>
                    <div className="item-3">
                        {trendButtons3}
                    </div>
                </div>

                {(render) ? results : null}
            </div>
        )
    }
}

export default Search;
