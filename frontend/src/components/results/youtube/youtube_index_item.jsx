import React from 'react';

class YoutubeIndexItem extends React.Component {

    render(){
        const video = this.props.video

        const youtubeTitle = video.snippet.title.length > 75 ? (
            video.snippet.title.slice(0, 75) + '...'
        ) : (
                video.snippet.title
            )

        return <div className="youtube-item">
            <iframe src={`//www.youtube.com/embed/${video.id.videoId}`} title={video.snippet.title} />
            <strong>{youtubeTitle}</strong>
          </div>;

    }
}

export default YoutubeIndexItem;