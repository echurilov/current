import React from 'react';
import '../css/search.css'
import { connect } from 'react-redux';
import { fetchTrends } from '../actions/trends_actions';
import { fetchResults } from '../actions/results_actions';
import { GridLoader } from 'react-spinners';
import { css } from 'react-emotion';
import SearchResults from './search_results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', render: true, trends: [] };
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentDidMount() {   
        this.props.fetchTrends()
            .then( () => this.setState({ trends: this.props.trends }) )
    }

    submitSearch(searchTermInput) {
        this.setState({ render: false })
        let searchTerm = searchTermInput || document.getElementById('search-input').value;
        this.props.fetchResults(searchTerm)
            .then(() => this.setState({ render: true, searchTerm: searchTerm }))
        document.getElementById('search-input').value = searchTerm;
        // this.setState({renderResults: true, searchTerm: searchTerm})
    }
    
    render() {
        // debugger
        let { trends } = this.props;
        let { searchTerm } = this.state;

        if (trends.length < 1) {
            return null;
        }
        
        let dailyTrends = trends.slice(0, 5)
        let dailyTrends2 = trends.slice(5, 10)
        let dailyTrends3 = trends.slice(10, 15)

        let trendButtons = [];
        for(let i = 0; i < dailyTrends.length; i++) {
            let btn = <button className="trend-btn" key={`trends-${i}`} onClick={() => this.submitSearch(dailyTrends[i])}> {dailyTrends[i]} </button>
            trendButtons.push(btn);
        }

        let trendButtons2 = [];
        for(let i = 0; i < dailyTrends2.length; i++) {
            let btn = <button className="trend-btn" key={`trends-${i * 2}`} onClick={() => this.submitSearch(dailyTrends2[i])}> {dailyTrends2[i]} </button>
            trendButtons2.push(btn);
        }

        let trendButtons3 = [];
        for(let i = 0; i < dailyTrends3.length; i++) {
            let btn = <button className="trend-btn" key={`trends-${i * 3}`} onClick={() => this.submitSearch(dailyTrends3[i])}>
                
                {dailyTrends3[i]}
              </button>;
            trendButtons3.push(btn);
        }


        let results = this.state.render ? (
            <SearchResults />
        ) : (
                <div className='sweet-loading'>
                    <GridLoader
                        sizeUnit={"px"}
                        height={30}
                        width={30}
                        color={'#D2512C'}
                        loading={this.state.loading}
                    />
                </div>
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
    fetchTrends: () => dispatch(fetchTrends()),
    fetchResults: searchTerm => dispatch(fetchResults(searchTerm))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);