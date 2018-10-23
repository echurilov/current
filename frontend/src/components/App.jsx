import React from 'react';
import SignupForm from './session/signup_form';
import Greeting from './greeting_temp';

class App extends React.Component {

    render() {
        return (
            <div>
                <h1>hey</h1>
                <SignupForm></SignupForm>
                <Greeting></Greeting>
            </div>
        )
    }

}


export default App;

