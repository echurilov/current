import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../../util/session_api_util';

class SignupForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = Object.assign({}, this.state);
		this.props.registerUser(user)
			// .then(res => console.log(res), err => console.log(err))
	}

	renderErrors() {
		return (
			<ul>
				{this.props.errors.map((error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

	render() {
		debugger
		if (this.props.errors.length > 1) { 
		}
		return (
			<div className="login-form-container">
				<form onSubmit={this.handleSubmit}>

					Please sign up or {<Link to="/login">log in instead</Link>}

					{this.props.errors.length > 1 ? this.renderErrors() : null}

					<div className="login-form">

						<label>Email:
              <input type="text"
								value={this.state.email}
								onChange={this.update('email')}
								className="login-input"
							/>
						</label>

						<label>Password:
              <input type="password"
								value={this.state.password}
								onChange={this.update('password')}
								className="login-input"
							/>
						</label>

						<input className="session-submit" type="submit" value='Sign Up' />
					</div>
				</form>
			</div>
		);
	}

}


const mapStateToProps = ({ errors }) => {
	return {
		errors: Object.values(errors.session)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (user) => dispatch(registerUser(user)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);