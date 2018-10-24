import React from "react";
const moment = require("moment");

class NewsIndexItem extends React.Component {

    render(){
        const article = this.props.article
        const date = new Date(article.publishedAt)
        console.log(date)

        return <div className="news-index-item">
            <img src={article.urlToImage} alt={""} />

            <div className="text-content">
              <a href={article.url}>
                <strong>{article.title}</strong>
              </a>

              <div className="published-info">
                <p>{article.source.name}</p>
                <p>{moment(article.publishedAt).fromNow()}</p>
              </div>

              <p>{article.description}</p>
            </div>
          </div>;
    }
}

export default NewsIndexItem;