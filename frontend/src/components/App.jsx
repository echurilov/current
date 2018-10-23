import React from 'react';
import '../css/app.css'
import SignupForm from './session/signup_form';
import LoginForm from './session/login_form';
import Greeting from './greeting_temp';

class App extends React.Component {

    render() {
        return (
            <div className="app-container">
                <Greeting></Greeting>
                <SignupForm></SignupForm>
                <LoginForm></LoginForm>
            </div>
        )
    }

}


export default App;

