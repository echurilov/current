import React from 'react';

class GiphyIndexItem extends React.Component {

  render() {
    return <div>
      <a target="_blank" href={this.props.giphyItem.embed_url}>
        <img 
          className="giphy-image" 
          src={this.props.giphyItem.images.fixed_height.url} 
          alt="giphy"/>
      </a>
      </div>;
  }

}

export default GiphyIndexItem;