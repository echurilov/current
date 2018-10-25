import React from 'react';
import '../css/search.css'
import { connect } from 'react-redux';
import { fetchTrends } from '../actions/trends_actions';
import SearchResults from './search_results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', render: false, trends: [] };
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentDidMount() {   
        this.props.fetchTrends()
            .then( () => this.setState({ trends: this.props.trends }) )
        // debugger
    }

    submitSearch(searchTermInput) {
        debugger;
        let searchTerm = searchTermInput || document.getElementById('search-input').value;
        // logic/call method for sending term to calls
        this.setState({renderResults: true, searchTerm: searchTerm})
    }

    render() {
        let { trends, searchTerm } = this.props;

        if (trends.length < 1) {
            return null;
        }
        
        let dailyTrends = trends.slice(0, 5)
        let dailyTrends2 = trends.slice(5, 10)
        let dailyTrends3 = trends.slice(10, 15)

        let trendButtons = [];
        for(let i = 0; i < dailyTrends.length; i++) {
            let btn = <button className="trend-btn" onClick={() => this.submitSearch(dailyTrends[i])}> {dailyTrends[i]} </button>
            trendButtons.push(btn);
        }

        let trendButtons2 = [];
        for(let i = 0; i < dailyTrends2.length; i++) {
            let btn = <button className="trend-btn" onClick={() => this.submitSearch(dailyTrends2[i])}> {dailyTrends2[i]} </button>
            trendButtons2.push(btn);
        }

        let trendButtons3 = [];
        for(let i = 0; i < dailyTrends3.length; i++) {
            let btn = <button className="trend-btn" onClick={() => this.submitSearch(dailyTrends3[i])}> {dailyTrends3[i]} </button>
            trendButtons3.push(btn);
        }

        let results = this.state.renderResults ? (
            <SearchResults searchTerm={searchTerm} />
        ) : (
            <div>Nothing to see here</div>
        )

        return (
            <div>

                <div className="search">
                    <form onSubmit={() => this.submitSearch(null)} className="search-input">
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

                { results }
            </div>
        )
    }
}


const mapStateToProps = state => ({
    trends: state.entities.trends
})

const mapDispatchToProps = dispatch => ({
    fetchTrends: () => dispatch(fetchTrends())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);