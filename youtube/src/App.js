import React, { useState, useEffect } from 'react';

import './App.css';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import useVideos from './hooks/useVideos';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, search] = useVideos('animes');

  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);

  return (
    <div className="container">
      <SearchBar onFormSubmit={search} />
      <div className="row">
        <div className="xs-12 md-8 col">
          <VideoDetail video={selectedVideo} />
        </div>
        <div className="xs-12 md-4 col">
          <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
        </div>
      </div>
    </div>
  );
};

export default App;
