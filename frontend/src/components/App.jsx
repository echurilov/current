import React from 'react';
import '../css/app.css'
// import SignupForm from './session/signup_form';
// import LoginForm from './session/login_form';
import Greeting from './greeting_temp';
import Modal from './modal';
import Search from './search';

class App extends React.Component {

    render() {
        return (
            <div className="app-container">
                <Modal></Modal>
                <Greeting></Greeting>
                <Search></Search>
            </div>
        )
    }

}


export default App;

