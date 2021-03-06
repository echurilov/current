import React from 'react';
import '../../css/session_form.css';
import { connect } from 'react-redux';
import { loginUser, GET_ERRORS } from '../../util/session_api_util';
import { openModal, closeModal } from '../../actions/modal_actions';


class LoginForm extends React.Component {

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
        this.props.loginUser(user)
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
            renderedErrors = this.renderErrors()
        } else {
            renderedErrors = null
        }
        return (
            <div className="animated slideInDown fast session-form-container">
                <form onSubmit={this.handleSubmit}>

                    please log in or {this.props.otherForm}


                    <div className="session-form">

                        <label>email
                        </label>
              <input type="text"
                                value={this.state.email}
                                onChange={this.update('email')}
                                className="session-input"
                            />

                        <label>password
                        </label>
              <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                className="session-input"
                            />

                        <button className="session-submit" type="submit">log in!</button>
                    </div>
                    {renderedErrors}

                </form>
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        errors: Object.values(state.errors.session),
        currentUser: state.session.email
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
        otherForm: (
            <span>
                <button type="button" className="other-form" onClick={() => { dispatch({ type: GET_ERRORS, payload: {} }); dispatch(openModal('signup')); }}>
                sign up
            </button>
            </span>
        ),
        closeModal: () => dispatch(closeModal()),
        clearErrors: () => dispatch({ type: GET_ERRORS, payload: {}})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);