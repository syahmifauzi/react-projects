import React from 'react';

const VideoItem = ({ video, onVideoSelect }) => {
  const { title, thumbnails } = video.snippet;
  return (
    <div className="video-item" onClick={() => onVideoSelect(video)}>
      <img className="thumbnail" src={thumbnails.medium.url} alt={title} />
      <div className="content">
        {title.substring(0, 40)}
        {title.length > 40 && '...'}
      </div>
    </div>
  );
};

export default VideoItem;
