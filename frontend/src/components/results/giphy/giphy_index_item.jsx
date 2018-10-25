import React from 'react';

class GiphyIndexItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
        <img 
          className="giphy-image" 
          src={this.props.giphyItem.images.fixed_height.url} />
      </div>;
  }

}

export default GiphyIndexItem;