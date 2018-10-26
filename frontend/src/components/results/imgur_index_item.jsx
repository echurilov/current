import React from 'react';
import "../../css/imgur.scss";

class ImgurIndexItem extends React.Component {

  render() {
    return <div className="imgur-index-item">
        <div className="imgur-header">
          <h1 className="imgur-header-title">{this.props.imgurItem.title}</h1>
          <img src="https://i.imgur.com/cX0VsCp.png"
               className="imgur-logo" />
        </div>
        <img className="imgur-image" src={this.props.imgurItem.link} alt="imgur" />
        <div>
          <p className="imgur-description">{this.props.imgurItem.description}</p>
        </div>
      </div>;
  }

}

export default ImgurIndexItem;