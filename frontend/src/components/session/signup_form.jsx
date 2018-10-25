import React from 'react';
import '../../css/session_form.css';
import { connect } from 'react-redux';
import { registerUser, GET_ERRORS } from '../../util/session_api_util';
import { openModal, closeModal } from '../../actions/modal_actions';


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
		this.setState({ email: '', password: '' });
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

		if (this.props.currentUser) {
			return null;
		}

		let renderedErrors;
		if (this.props.errors.length > 0) { 
			console.log(this.props.errors);
			renderedErrors = this.renderErrors()
		} else {
			renderedErrors = null
		}
		return (
			<div className="animated slideInDown fast session-form-container">
				<form onSubmit={this.handleSubmit}>

					Please sign up or {this.props.otherForm}


					<div className="session-form">

						<label>Email:
						</label>
              <input type="text"
								value={this.state.email}
								onChange={this.update('email')}
								className="session-input"
							/>

						<label>Password:
						</label>
              <input type="password"
								value={this.state.password}
								onChange={this.update('password')}
								className="session-input"
							/>

						<input className="session-submit" type="submit" value='Sign Up' />
					</div>
				{renderedErrors}
				</form>


			</div>
		);
	}

}


const mapStateToProps = ({ errors, session }) => {
	return {
		errors: Object.values(errors.session),
		currentUser: session.email
	};
};

const mapDispatchToProps = dispatch => {
	return {
		registerUser: (user) => dispatch(registerUser(user)),
		otherForm: (
			<span>
				<button className="other-form" onClick={() => { dispatch({ type: GET_ERRORS, payload: {} }); dispatch(openModal('login'));}}>
				Log In
      </button>
			</span>
		),
		closeModal: () => dispatch(closeModal()),
		clearErrors: () => dispatch({ type: GET_ERRORS, payload: {} })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);