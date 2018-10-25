import React from 'react';
import "../../../css/index_items/giphy.css";

class GiphyIndexItem extends React.Component {

  render() {
    return <div>
        <img 
          className="giphy-image" 
          src={this.props.giphyItem.images.fixed_height.url} 
          alt="giphy"/>
      </div>;
  }

}

export default GiphyIndexItem;