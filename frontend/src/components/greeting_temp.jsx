import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../util/session_api_util';

class GreetingTemp extends React.Component {

  render() {
    if (!this.props.currentUsername) {
      return null
    }
    return (
      <div>
        <h1>greetings {this.props.currentUsername}</h1>
        <button className="header-button" onClick={this.props.logoutUser}>Log Out</button>
      </div>
    )
  }

}

const mapStateToProps = ({session}) => {
  return {
    currentUsername: session.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GreetingTemp);