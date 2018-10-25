import React from 'react';
import '../css/search.css'
// import { connect } from 'react-redux';
// import SearchResults from './search_results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', render: false, dailyTrends: [], dailyTrends2: [] };
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentDidMount() {
        this.setState({ dailyTrends: ['Ariana Grande', 'Westminster Dog Show', 'World Cup', 'Amazon Go', 'Halloween', 'Game of Thrones'] })
        this.setState({ dailyTrends2: ['Matt Damon', 'The Warriors', 'Voter Registration', 'Supreme Court', 'Haunted Houses', 'Drake'] })
        this.setState({ render: true })
    }

    submitSearch(searchTermInput) {
        let searchTerm = searchTermInput || document.getElementById('search-input').value;
        // logic/call method for sending term to calls
    }

    render() {
        let { render, dailyTrends, dailyTrends2 } = this.state;

        if (!render) {
            return null;
        }

        let trendButtons = [];
        for(let i = 0; i < dailyTrends.length; i++) {
            let btn = <button key={`trend-${i}`} className="trend-btn animated slideInLeft" onClick={this.submitSearch(dailyTrends[i])}> {dailyTrends[i]} </button>
            trendButtons.push(btn);
        }

        let trendButtons2 = [];
        for(let i = 0; i < dailyTrends2.length; i++) {
            let btn = <button key={`trend-${i * 2}`} className="trend-btn animated slideInLeft" onClick={this.submitSearch(dailyTrends2[i])}> {dailyTrends2[i]} </button>
            trendButtons2.push(btn);
        }

        let results = ''
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
                    {trendButtons}
                </div>

                {(render) ? results : null}
            </div>
        )
    }
}

export default Search;
