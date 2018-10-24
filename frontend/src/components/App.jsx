import React from 'react';
import '../css/app.css'
// import SignupForm from './session/signup_form';
// import LoginForm from './session/login_form';
import Greeting from './greeting_temp';
import Modal from './modal';
import NewsIndexContainer from './apis/news/news_index_container'

class App extends React.Component {

    render() {
        return (
            <div className="app-container">
                <Modal></Modal>
                <Greeting></Greeting>
                <NewsIndexContainer />
            </div>
        )
    }

}


export default App;

