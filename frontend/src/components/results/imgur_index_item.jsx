import React from 'react';

class ImgurIndexItem extends React.Component {

  render() {
    return <div className="imgur-index-item">
        <div className="imgur-header">
          <h1>{this.props.imgurItem.title}</h1>
          <img src="https://i.imgur.com/cX0VsCp.png" />
        </div>
        <img className="imgur-image" src={this.props.imgurItem.link} alt="imgur" />
        <div>
          <p>{this.props.imgurItem.description}</p>
        </div>
      </div>;
  }

}

export default ImgurIndexItem;