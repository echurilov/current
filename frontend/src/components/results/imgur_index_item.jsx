import React from 'react';
import "../../css/imgur.scss";

class ImgurIndexItem extends React.Component {

  render() {

    const { imgurItem } = this.props;
    const linkParts = imgurItem.link.split('.');
    linkParts.pop();
    const link = linkParts.join('.');

    const imgurTitle = imgurItem.title.length > 43 ? (
      imgurItem.title.slice(0, 43) + '...'
    ) : (
      imgurItem.title
    )

    return <a target="_blank" 
      rel="noopener noreferrer" 
      href={link} 
      className="imgur-index-item">
        <img className="imgur-image" src={imgurItem.link} alt="imgur" />
        <div className="imgur-title-container">
          <h1 className="imgur-title">{imgurTitle}</h1>
          <img src="https://i.imgur.com/cX0VsCp.png" alt=""
            className="imgur-logo" />
        </div>
      </a>;
  }

}

export default ImgurIndexItem;