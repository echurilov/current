import React from 'react';
import '../css/app.css';
import Header from './header';
// import Modal from './modal';
import Search from './search';

class App extends React.Component {

    render() {
        return (
            <div className="app-container">
                <Header></Header>
                <Search></Search>
            </div>
        )
    }

}


export default App;

