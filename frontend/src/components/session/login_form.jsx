import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../util/session_api_util';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        <div>
            <h1>loginform</h1>
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
        loginUser: (user) => dispatch(loginUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);