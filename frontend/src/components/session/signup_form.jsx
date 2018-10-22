import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../util/session_api_util';

class SignupForm extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		<div>
			<h1>signupform</h1>
		</div>
	}
}


const mapStateToProps = ({ errors }) => {
	return {
		errors: errors.session
	};
};

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (user) => dispatch(registerUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);