import React from 'react';
import '../css/app.css'
// import SignupForm from './session/signup_form';
// import LoginForm from './session/login_form';
import Greeting from './greeting_temp';
import Modal from './modal';
<<<<<<< HEAD
import NewsIndexContainer from './apis/news/news_index_container'
=======
import Search from './search';
>>>>>>> 2be6375e1ac972e2595653709fc75190c61e76af

class App extends React.Component {

    render() {
        return (
            <div className="app-container">
                <Modal></Modal>
                <Greeting></Greeting>
<<<<<<< HEAD
                <NewsIndexContainer />
=======
                <Search></Search>
>>>>>>> 2be6375e1ac972e2595653709fc75190c61e76af
            </div>
        )
    }

}


export default App;

