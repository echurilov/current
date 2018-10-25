import React from 'react';
import '../css/header.css'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../util/session_api_util';
import { openModal } from '../actions/modal_actions';
import { clearResults } from '../actions/results_actions';

class Header extends React.Component {

  constructor(props) {
    super(props);
    this.clearSearch = this.clearSearch.bind(this);
  }

  clearSearch() {
    document.getElementById('search-input').value = '';
    this.props.clearResults();
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
          <a className="header-links">About Us</a>
          <a className="header-links">What's Current?</a>
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
    openModal: modal => dispatch(openModal(modal)),
    clearResults: () => dispatch(clearResults())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);