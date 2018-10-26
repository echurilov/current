import React from 'react';
import '../css/search.css'
import { connect } from 'react-redux';
import { fetchTrends, fetchRelatedTopics } from '../actions/trends_actions';
import { fetchResults } from '../actions/results_actions';
import { GridLoader } from 'react-spinners';
import { openModal } from '../actions/modal_actions';
import { createBookmark } from '../actions/bookmark_actions';
import SearchResults from './search_results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', render: true, trends: [] };
        this.submitSearch = this.submitSearch.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {   
        this.props.fetchTrends()
            .then( () => this.setState({ trends: this.props.trends }) )
    }

    submitSearch(searchTermInput) {
        this.setState({ render: false })
        let searchTerm = searchTermInput || document.getElementById('search-input').value;
        this.props.fetchResults(searchTerm)
            .then( () => this.props.fetchRelatedTopics(searchTerm) )
            .then(() => this.setState({ render: true, searchTerm: searchTerm }))
        document.getElementById('search-input').value = searchTerm;
    }

    onSave() {
        if (!this.props.userId) {
            this.props.openModal('login');
        } else {
            let query = document.getElementById('search-input').value;
            let user_id = this.props.userId;
            let bookmark = { query, user_id };
            debugger
            this.props.createBookmark(bookmark);
        }
    }
    
    render() {
        let { trends, relatedTopics } = this.props;
        let { searchTerm } = this.state;

        let trendButtons;
        let trendButtons2;
        let trendButtons3;
        
        if (trends.length < 1) {
            trendButtons = null;
            trendButtons2 = null;
            trendButtons3 = null;
        } else if (searchTerm.length < 1 || relatedTopics.length === 0) {
            // debugger
            let dailyTrends = trends.slice(0, 5)
            let dailyTrends2 = trends.slice(5, 10)
            let dailyTrends3 = trends.slice(10, 15)
    
            trendButtons = [];
            for(let i = 0; i < dailyTrends.length; i++) {
                let btn = <button className="trend-btn" key={`trends-${i}`} onClick={() => this.submitSearch(dailyTrends[i])}> {dailyTrends[i]} </button>
                trendButtons.push(btn);
            }
    
            trendButtons2 = [];
            for(let i = 0; i < dailyTrends2.length; i++) {
                let btn = <button className="trend-btn" key={`trends-${i * 2}`} onClick={() => this.submitSearch(dailyTrends2[i])}> {dailyTrends2[i]} </button>
                trendButtons2.push(btn);
            }
    
            trendButtons3 = [];
            for(let i = 0; i < dailyTrends3.length; i++) {
                let btn = <button className="trend-btn" key={`trends-${i * 3}`} onClick={() => this.submitSearch(dailyTrends3[i])}>
                    
                    {dailyTrends3[i]}
                  </button>;
                trendButtons3.push(btn);
            }
        } else {
            let dailyTrends = relatedTopics.slice(0, 5)
            let dailyTrends2 = relatedTopics.slice(5, 10)
            let dailyTrends3 = relatedTopics.slice(10, 15)

            trendButtons = [];
            for (let i = 0; i < dailyTrends.length; i++) {
                let btn = <button className="trend-btn-1" key={`trends-${i}`} onClick={() => this.submitSearch(dailyTrends[i])}> {dailyTrends[i]} </button>
                trendButtons.push(btn);
            }

            trendButtons2 = [];
            for (let i = 0; i < dailyTrends2.length; i++) {
                let btn = <button className="trend-btn-1" key={`trends-${i * 2}`} onClick={() => this.submitSearch(dailyTrends2[i])}> {dailyTrends2[i]} </button>
                trendButtons2.push(btn);
            }

            trendButtons3 = [];
            for (let i = 0; i < dailyTrends3.length; i++) {
                let btn = <button className="trend-btn-1" key={`trends-${i * 3}`} onClick={() => this.submitSearch(dailyTrends3[i])}>

                    {dailyTrends3[i]}
                </button>;
                trendButtons3.push(btn);
            }
        }
        


        let results = this.state.render ? (
            <SearchResults />
        ) : (
                <div className='sweet-loading'>
                    <GridLoader
                        sizeUnit={"px"}
                        height={30}
                        width={30}
                        color={'#7dbbc2'}
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
                            placeholder="see what's trending..."></input>
                   
                        <button onClick={() => this.onSave()} className="add-btn"><i className="fa fa-plus"></i> </button>
                       
                        <button onClick={() => this.props.openModal('bookmark')} className="modal-btn"><i className="fa fa-bookmark"></i> </button>

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
    trends: state.entities.trends,
    relatedTopics: state.entities.relatedTopics,
    userId: state.session.id
})

const mapDispatchToProps = dispatch => ({
    fetchTrends: () => dispatch(fetchTrends()),
    openModal: modal => dispatch(openModal(modal)),
    fetchRelatedTopics: (searchTerm) => dispatch(fetchRelatedTopics(searchTerm)),
    fetchResults: searchTerm => dispatch(fetchResults(searchTerm)),
    createBookmark: bookmark => dispatch(createBookmark(bookmark))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);