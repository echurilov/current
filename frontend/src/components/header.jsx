import React from 'react';
import '../css/header.css'
import { connect } from 'react-redux';
import { logoutUser, loginUser } from '../util/session_api_util';
import { openModal } from '../actions/modal_actions';
import { clearResults } from '../actions/results_actions';
import Typed from 'typed.js';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.ghostType = this.ghostType.bind(this);
  }

  clearSearch() {
    document.getElementById('search-input').value = '';
    this.props.clearResults();
  }

  handleDemo() {
    const user = { email: 'demouser@gmail.com', password: '123456'};
    this.props.loginUser(user);
  }

  ghostType() {
    document.getElementById('search-input').value = '';
    let options = {
      strings: [
        'welcome to current!',
        'click on the trending topics below to check them out,',
        'save your favorite topics on the right,',
        'or type in this search bar to explore more!',
        ''
      ],
      typeSpeed: 60
    }
    // npm module typed.js
    let typed = new Typed(".search-bar", options);
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
          <button onClick={this.ghostType} className="header-links">How do I use Current?</button>
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

const mapStateToProps = ({session}) => {
  return {
    currentUser: session.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    loginUser: (userData) => dispatch(loginUser(userData)),
    openModal: modal => dispatch(openModal(modal)),
    clearResults: () => dispatch(clearResults())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);