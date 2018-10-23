import React from 'react';
// import { connect } from 'react-redux';
import SearchResults from './search_results';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: '', render: false };
        this.timeout = 0;
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(e) {
        this.setState({ render: false })

        let val = e.target.value

        if (this.timeout) clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.setState({ render: true });
        }, 300);
        this.setState({ searchTerm: val });
    }

    render() {
        let { searchTerm, render } = this.state;

        let results = <SearchResults searchTerm={searchTerm} />
        

        return (
            <div className="search">
                <div className="search-input">
                    <input autoFocus="autoFocus"
                        type="text"
                        value={this.state.searchTerm}
                        onChange={this.updateInput}
                        placeholder="See what's trending..."></input>
                </div>

                {(render) ? results : null}
            </div>
        )
    }
}

export default Search;
