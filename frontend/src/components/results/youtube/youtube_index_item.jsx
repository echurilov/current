import React from 'react';

class YoutubeIndexItem extends React.Component {

    render(){
        const video = this.props.video

        return <div className="youtube-item">
            <strong>{video.snippet.title}</strong>
            <iframe src={`//www.youtube.com/embed/${video.id.videoId}`} title={video.snippet.title} />
          </div>;

    }
}

export default YoutubeIndexItem;