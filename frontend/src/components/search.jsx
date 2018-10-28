import React from 'react';
import Modal from './modal';
import '../css/search.css'
import { connect } from 'react-redux';
import { fetchTrends, fetchRelatedTopics } from '../actions/trends_actions';
import { fetchResults, clearResults } from '../actions/results_actions';
import { GridLoader } from 'react-spinners';
import { openModal } from '../actions/modal_actions';
import { createBookmark } from '../actions/bookmark_actions';
import SearchResults from './search_results';
import Typed from 'typed.js';

const mapStateToProps = state => ({
  trends: state.entities.trends,
  relatedTopics: state.entities.relatedTopics,
  userId: state.session.id,
  userEmail: state.session.email
});

const mapDispatchToProps = dispatch => ({
  fetchTrends: () => dispatch(fetchTrends()),
  openModal: modal => dispatch(openModal(modal)),
  fetchRelatedTopics: searchTerm => dispatch(fetchRelatedTopics(searchTerm)),
  fetchResults: (searchTerm, filters) =>
    dispatch(fetchResults(searchTerm, filters)),
  createBookmark: bookmark => dispatch(createBookmark(bookmark)),
  clearResults: () => dispatch(clearResults())
});
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', render: true, trends: [], demoed: false };
        this.submitSearch = this.submitSearch.bind(this);
        this.onSave = this.onSave.bind(this);
        this.openBookmarks = this.openBookmarks.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.drawOnPage = this.drawOnPage.bind(this);
    }

    componentDidMount() {   
        this.props.fetchTrends()
            .then( () => this.setState({ trends: this.props.trends }) )
            .then( () => this.drawOnPage() )
    }

    componentWillReceiveProps(newProps) {
        if (newProps.userEmail === 'demo@user.com' && !this.state.demoed) {
            let options = {
                strings: [
                    'welcome to current!',
                    'click on the trending topics below to check them out,',
                    'save your favorite topics on the right,',
                    'or type in this search bar to explore more!',
                    ''
                ],
                typeSpeed: 40
            }
            // npm module typed.js
            let typed = new Typed(".search-bar", options);
            this.setState({ demoed: true })
        }
    }

    drawOnPage() {
 
    }

    clearSearch() {
        document.getElementById('search-input').value = '';
        this.props.clearResults();
    }

    submitSearch(searchTermInput) {
        this.setState({ render: false })
        let filters = { imgur: true, giphy: true, news: true, youtube: true };
        let searchTerm = searchTermInput || document.getElementById('search-input').value;
       
        this.props.fetchResults(searchTerm, filters)
            .then( () => this.props.fetchRelatedTopics(searchTerm))
            .then(() => this.setState({ render: true, searchTerm: searchTerm }))
        document.getElementById('search-input').value = searchTerm;
    }

    onSave(e) {
        e.preventDefault();
        if (!this.props.userId) {
            this.props.openModal('login');
        } else {
            let query = document.getElementById('search-input').value;
            let user_id = this.props.userId;
            let bookmark = { query, user_id };
            this.props.createBookmark(bookmark);
        }
    }

    openBookmarks() {
        if (!this.props.userId) {
            this.props.openModal('login');
        } else {
            this.props.openModal('bookmark')
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
        } else if (( searchTerm && searchTerm.length < 1 )|| relatedTopics.length === 0) {
            let dailyTrends = trends.slice(0, 4)
            dailyTrends.push("Halloween");
            let dailyTrends2 = trends.slice(5, 10)
            let dailyTrends3 = trends.slice(10, 15)
            let pulseIdx = Math.floor(Math.random() * 5)
            console.log(pulseIdx);

            trendButtons = [];
            for(let i = 0; i < dailyTrends.length; i++) {
                let btn = <button className="trend-btn animated pulse fast delay-2s" key={`trends-${i}`} onClick={() => this.submitSearch(dailyTrends[i])}> {dailyTrends[i]} </button>
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
            let pulseIdx = Math.floor(Math.random() * 5)
            console.log(pulseIdx);

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

        return <div>
            <Modal bookmarkFunc={this.submitSearch} />

            <div className="search">
              <button type="button" onClick={this.clearSearch} className="home-btn">
                <i className="fa fa-home" />{" "}
              </button>
              <button type="button" onClick={this.openBookmarks} className="modal-btn">
                <i className="fa fa-bookmark" />{" "}
              </button>

              <form className="search-input">
                <button type="button" onClick={this.onSave} className="add-btn">
                  <i className="fa fa-plus" />{" "}
                </button>
                <input className="search-bar" id="search-input" autoFocus="autoFocus" type="text" spellcheck="false" />

                <button type="submit" onClick={() => this.submitSearch(null)} className="search-btn">
                  <i className="fa fa-search" />
                </button>

                <dl className="search-options-dropdown">
                  <dt>
                    <button className="dropdown-button">
                      <i className="fas fa-chevron-down" />
                    </button>
                  </dt>

                  <dd className="dropdown-content">
                    <ul className="dropdown-options">
                      <li className="dropdown-item">
                        <label className="dropdown-item-label">
                          giphy
                          <input type="checkbox" value="giphy" />
                          <span class="checkmark"></span>
                        </label>
                      </li>
                      <li className="dropdown-item">
                        <label className="dropdown-item-label">
                          imgur
                          <input type="checkbox" value="imgur" />
                          <span class="checkmark" />
                        </label>
                      </li>
                      <li className="dropdown-item">
                        <label className="dropdown-item-label">
                          news
                          <input type="checkbox" value="news" />
                          <span class="checkmark" />
                        </label>
                      </li>
                      <li className="dropdown-item">
                        <label className="dropdown-item-label">
                          youtube
                          <input type="checkbox" value="youtube" />
                          <span class="checkmark" />
                        </label>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </form>
            </div>

            <div className="trends">
              <div className="item-1">{trendButtons}</div>
              <div className="item-2">{trendButtons2}</div>
              <div className="item-3">{trendButtons3}</div>
            </div>

            {results}
          </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);