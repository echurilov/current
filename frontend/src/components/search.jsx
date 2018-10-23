import React from 'react';
import '../css/search.css'
// import { connect } from 'react-redux';
// import SearchResults from './search_results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', render: false };
        // this.timeout = 0;
        // this.updateInput = this.updateInput.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    // updateInput(e) {
    //     this.setState({ render: false })

    //     let val = e.target.value

    //     if (this.timeout) clearTimeout(this.timeout);

    //     this.timeout = setTimeout(() => {
    //         this.setState({ render: true });
    //     }, 300);
    //     this.setState({ searchTerm: val });
    // }

    submitSearch() {
        let searchTerm = document.getElementById('search-input').value;
        // login for sending term to calls
    }

    render() {
        let { render } = this.state;

        // let results = <SearchResults searchTerm={searchTerm} />
        let results = 'result'

        return (
            <div className="search">
                
                <form onSubmit={this.submitSearch} className="search-input">
                    <input 
                        className="search-bar"
                        id="search-input"
                        autoFocus="autoFocus"
                        type="text"
                        placeholder="See what's trending..."></input>
                
                <button type="submit" className="search-btn">
                    <i className="fa fa-search"></i>
                </button>
                </form>
                
                {(render) ? results : null}
            </div>
        )
    }
}

export default Search;
