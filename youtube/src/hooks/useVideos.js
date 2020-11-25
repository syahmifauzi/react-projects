import { useState, useEffect } from 'react';
import axios from 'axios';

const useVideos = defaultSearchTerm => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async term => {
    try {
      const response = await axios.get(
        'https://youtube-sf.netlify.app/.netlify/functions/youtube',
        { params: { term } }
      );
      setVideos(response.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  return [videos, search];
};

export default useVideos;
