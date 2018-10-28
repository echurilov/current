import React from "react";
import "../../../css/reset.css";
import "../../../css/news.scss";
const moment = require("moment");

class NewsIndexItem extends React.Component {
 
    render(){
        const article = this.props.article
        const image = article.urlToImage ? 
            <img src={article.urlToImage} alt={""} />
        : <img src="https://newsapi.org/images/n-logo-border.png" alt={""} />;

        return <div className="news-index-item">
          <a target="_blank" rel="noopener noreferrer" href={article.url}>
            {image} </a>

            <div className="text-content">
            <a target="_blank" rel="noopener noreferrer" href={article.url}>
                <strong>{article.title}</strong>
              </a>

              <div className="published-info">
              <a target="_blank" rel="noopener noreferrer" href={article.url}>
                  <p>{article.source.name}</p>
                </a>
                <p>-</p>
                <p>{moment(article.publishedAt).fromNow()}</p>
              </div>

            <a target="_blank" rel="noopener noreferrer" href={article.url}>
                <p>{article.description}</p>
              </a>

            <a target="_blank" rel="noopener noreferrer" href="https://newsapi.org/"><strong className="attribution">Powered by NewsAPI</strong></a>
            </div>
          </div>;
    }
}

export default NewsIndexItem;