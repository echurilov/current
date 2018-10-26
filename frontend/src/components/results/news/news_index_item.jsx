import React from "react";
import "../../../css/reset.css";
import "../../../css/news.scss";
const moment = require("moment");

class NewsIndexItem extends React.Component {
 
    render(){
        const article = this.props.article

        return <div className="news-index-item">
            <a target="_blank" href={article.url}>
              <img src={article.urlToImage} alt={""} />
            </a>

            <div className="text-content">
              <a target="_blank" href={article.url}>
                <strong>{article.title}</strong>
              </a>

              <div className="published-info">
                <a target="_blank" href={article.url}>
                  <p>{article.source.name}</p>
                </a>
                <p>-</p>
                <p>{moment(article.publishedAt).fromNow()}</p>
              </div>

              <a target="_blank" href={article.url}>
                <p>{article.description}</p>
              </a>

                <a target="_blank" href="https://newsapi.org/"><strong className="attribution">Powered by NewsAPI</strong></a>
            </div>
          </div>;
    }
}

export default NewsIndexItem;