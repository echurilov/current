import React from 'react';
import "../../css/imgur.scss";

class ImgurIndexItem extends React.Component {

  render() {
    return <div className="imgur-index-item">
        <div className="imgur-header">
          <img src="https://i.imgur.com/cX0VsCp.png"
               className="imgur-logo" />
        </div>
        <img className="imgur-image" src={this.props.imgurItem.link} alt="imgur" />
        <div>
          <h1 className="imgur-header-title">{this.props.imgurItem.title}</h1>
        </div>
      </div>;
  }

}

export default ImgurIndexItem;