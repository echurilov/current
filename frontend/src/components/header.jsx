import React from 'react';
import '../css/header.css'
import { connect } from 'react-redux';
import { logoutUser, loginUser } from '../util/session_api_util';
import { openModal } from '../actions/modal_actions';
import { clearResults, fetchResults } from '../actions/results_actions';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  clearSearch() {
    document.getElementById('search-input').value = '';
    const filters = {imgur: true, tumblr: true, giphy: true, news: true, youtube: true};
    this.props.fetchResults(null, filters, this.props.trends.slice(0,5));
  }

  handleDemo() {
    const user = { email: 'demo@user.com', password: 'password'};
    this.props.loginUser(user);
  }

  render() {
    let user;
    let welcome;
    let logout;
    if (!this.props.currentUser) {
      user = null
      logout = null;
      welcome = (
        <div>
          <button className="session-button" onClick={this.handleDemo}>Demo</button>
          <button className="session-button" onClick={() => this.props.openModal('login')}>Log In</button>
          <button className="session-button" onClick={() => this.props.openModal('signup')}>Sign Up</button>
        </div>
      )
    } else {
      user = this.props.currentUser;
      logout = (<button className="session-button" onClick={this.props.logoutUser}>Log Out</button>)
      welcome = (<h4>welcome, {user}</h4>);
    }

    return (
      <div className="header-container">
        <div>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/echurilov/current" className="header-links">About Us</a>
          <button onClick={() => this.props.openModal('instructions')} className="header-links">How do I use Current?</button>
        </div>
        <button onClick={this.clearSearch}>
         <img src={window.location.origin + '/images/current-logo.png'} alt="current"></img>
        </button>
        <div className="right-header">
        {welcome}
        {logout}
        </div>
      </div>
    )
  }

}

const mapStateToProps = ({session, entities}) => {
  return {
    currentUser: session.email,
    trends: entities.trends,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    loginUser: (userData) => dispatch(loginUser(userData)),
    openModal: modal => dispatch(openModal(modal)),
    clearResults: () => dispatch(clearResults()),
    fetchResults: (searchTerm, filters, landingPageTopics) => 
      dispatch(fetchResults(searchTerm, filters, landingPageTopics))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);