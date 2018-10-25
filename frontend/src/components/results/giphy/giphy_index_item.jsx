import React from 'react';
import "../../../css/index_items/giphy.css";

class GiphyIndexItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    debugger;
    return <div>
        <img 
          className="giphy-image" 
          src={this.props.giphyItem.images.fixed_height.url} />
      </div>;
  }

}

export default GiphyIndexItem;