import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { loginUser } from '../../util/session_api_util';
import { openModal } from '../../actions/modal_actions';


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
        this.props.loginUser(user);
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

        // console.log(this.props.errors);
        
        
        let renderedErrors;
        if (this.props.errors.length > 0) {
            renderedErrors = this.renderErrors()
            debugger
        } else {
            renderedErrors = null
        }
        return (
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit}>

                    Please log in or {this.props.otherForm}

                    {renderedErrors}

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

                        <input className="session-submit" type="submit" value='Log in' />
                    </div>
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
            <button onClick={() => dispatch(openModal('signup'))}>
                Sign Up
            </button>
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);