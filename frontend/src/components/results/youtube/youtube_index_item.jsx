import React from 'react';

class YoutubeIndexItem extends React.Component {

    render(){
        const video = this.props.video

        return <div className="youtube-item">
            <iframe src={`//www.youtube.com/embed/${video.id.videoId}`} title={video.snippet.title} />
            <strong>{video.snippet.title}</strong>
          </div>;

    }
}

export default YoutubeIndexItem;