import React from "react";
const moment = require("moment");

class NewsIndexItem extends React.Component {

    render(){
        const article = this.props.article
        const date = new Date(article.publishedAt)
        console.log(date)

        return <div className="news-index-item">
            <a href={article.url}>
              <img src={article.urlToImage} alt={""} />
            </a>

            <div className="text-content">
              <a href={article.url}>
                <strong>{article.title}</strong>
              </a>

              <div className="published-info">
                <a href={article.url}>
                  <p>{article.source.name}</p>
                </a>
                <p>-</p>
                <p>{moment(article.publishedAt).fromNow()}</p>
              </div>

              <a href={article.url}>
                <p>{article.description}</p>
              </a>
            </div>
          </div>;
    }
}

export default NewsIndexItem;