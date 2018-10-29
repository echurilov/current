import React from 'react';
import '../../css/tumblr.scss';

class TumblrIndexItem extends React.Component {

  render() {
    const { tumblrItem } = this.props;

    const tumblrTitle = tumblrItem.summary.length > 43 ? (
      tumblrItem.summary.slice(0,65) + '...'
    ) : (
      tumblrItem.summary
    )

    const tags = tumblrItem.tags.length > 0 ? (
      tumblrItem.tags.map( tag => {
        return `#${tag}`
      })
    ) : (
      []
    )

    return (
      <div className="tumblr-index-item">
        <img className="tumblr-image" src={tumblrItem.photos[0].original_size.url} alt="tumblr" />
      
        <div className="tumblr-blog-info">
          <a className="tumblr-title"
             href={tumblrItem.post_url}
             target="_blank"
             rel="noopener noreferrer"
          >
            {tumblrTitle}
          </a>
          <img 
            src="https://vignette.wikia.nocookie.net/animal-jam-clans-1/images/7/74/Tumblr-logo.png/revision/latest?cb=20171122203345" 
            className="tumblr-logo" 
            alt="tumblr-logo" />
          <a 
            href={tumblrItem.blog.url} 
            className="tumblr-blog-name" 
            target="_blank"
            rel="noopener noreferrer"
          >{tumblrItem.blog.name}</a>
          <ul className="tumblr-tags-string" >
            {tags.map(tag => {
              const tagString = tag.slice(1);
              return (
                <a key={Math.random()} href={`https://www.tumblr.com/tagged/${tagString}`}
                   className="tumblr-tag-link"
                   target="_blank"
                   rel="noopener noreferrer"
                >
                {tag} 
              </a>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

}

export default TumblrIndexItem;