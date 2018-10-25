import React from 'react';
import NewsIndexItem from './news_index_item';
import "../../../css/reset.css";
import "../../../css/news.scss";


class NewsIndex extends React.Component {
    render(){
        const newsItems = this.props.articles.map((article, idx) => {
            return <NewsIndexItem key={`news-${idx}`} article={article} />
        })

        return <div className="news-index">
            <div className="grid">{newsItems}</div>
          </div>;
    }
}

export default NewsIndex;