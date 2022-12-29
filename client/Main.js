import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import AllAlbums from './AllAlbums';
import Player from './Player';
import SingleAlbum from './SingleAlbum';
import axios from "axios";

// dummy data 1
// const dummyAlbums = [
//   {
//     "id": 1,
//     "name": "No Dummy",
//     "artworkUrl": "default-album.jpg",
//     "artistId": 1,
//     "artist": {
//       "id": 1,
//       "name": "The Crash Test Dummies"
//     }
//   },
//   {
//     "id": 2,
//     "name": "I React to State",
//     "artworkUrl": "default-album.jpg",
//     "artistId": 1,
//     "artist": {
//       "id": 1,
//       "name": "The Crash Test Dummies"
//     }
//   }
// ]

// dummy data 2
// const dummyAlbums = [{
//   "id": 3,
//   "name": "Chain React-ion",
//   "artworkUrl": "default-album.jpg",
//   "artistId": 1,
//   "artist": {
//     "id": 1,
//     "name": "The Crash Test Dummies",
//   },
//   "songs": [
//     {
//       "id": 13,
//       "name": "Set Some State",
//       "audioUrl": "https://storage.googleapis.com/juke-1379.appspot.com/juke-music/Dexter%20Britain/Zenith/01%20Shooting%20Star.mp3",
//       "genre": "Instrumental",
//       "albumId": 2,
//       "artistId": 1
//     }
//   ]
// }]

const audio = document.createElement('audio');

const Main = () => {
  const [mainAlbums, setMainAlbums] = useState([]);
  const [albumInView, setAlbumInView] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [currentSong, setCurrentSong] = useState({});
  const [audioState, setAudioState] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/albums')
        const albums = res.data;
        setMainAlbums(albums);
      } catch (error) {
        console.log('There was a problem with making the albums')
      }
    }
    fetchData();
  }, []);

  const albumClick = (albumId) => {
    const fetchData = async () => {
      const res = await axios.get(`/api/albums/${albumId}`);
      setSelectedAlbum(res.data);
      setAlbumInView(res.data);
    }
    fetchData();
  }

  function resetAlbumInView() {
    setAlbumInView({});
    return albumInView;
  }

  function songClick(song) {
    audio.pause();
    playAudio(song.audioUrl, song);
    setCurrentSong(song);
  }

  function playClick() {
    audioState ? audio.pause() : audio.play();
    audioState ? setAudioState('') : setAudioState('playing');
  }

  useEffect(() => {
    audio.paused ? setAudioState('') : setAudioState('playing');
    audio.ended ? setAudioState('') : null;
  }, [audio.paused, audio.played, audio.ended]);

  const playAudio = async (audioUrl) => {
    if (audio.paused) {
      audio.src = audioUrl;
      audio.play();
    }
  }

  useEffect(() => {
    audio.addEventListener('ended', next);

    // this will remove the event listener when the component unmounts
    return () => {
      audio.removeEventListener('ended', next);
    };
  }, [audio.played]);

  function next() {
    audio.pause();
    const songs = selectedAlbum.songs;
    var songIndex = songs.indexOf(currentSong);
    songIndex = songIndex+1;
    var nextSong = songs[songIndex];
    if (!nextSong) {
      playAudio(songs[0].audioUrl, songs[0]);
      setCurrentSong(songs[0]);
    } else {
      playAudio(songs[songIndex].audioUrl, songs[songIndex]);
      setCurrentSong(nextSong);
    }
  }

  function previous() {
    audio.pause();
    const songs = selectedAlbum.songs;
    var songIndex = songs.indexOf(currentSong);
    songIndex = songIndex-1;
    var previousSong = songs[songIndex];
    if (!previousSong) {
      playAudio(songs[songs.length - 1].audioUrl, songs[songs.length - 1]);
      setCurrentSong(songs[songs.length - 1]);
    } else {
      playAudio(songs[songIndex].audioUrl, songs[songIndex]);
      setCurrentSong(previousSong);
    }
  }

  return (
    <div id="main" className="row container">
      <Sidebar
        resetAlbumInView={resetAlbumInView}
        setAlbumInView={setAlbumInView}
      />
      <div className='container'>
        {
          !albumInView.id ? 
            <AllAlbums 
              albums={mainAlbums} 
              albumClick={albumClick}
            /> 
          : <SingleAlbum 
            selectedAlbum={selectedAlbum} 
            currentSong={currentSong} 
            songClick={songClick}
            />
        }
      </div>  
      <div id='player-container'>
        <Player 
          selectedAlbum={selectedAlbum}
          currentSong={currentSong}
          audioState={audioState}
          next={next}
          previous={previous}
          playClick={playClick}
        />
      </div>
    </div>
  );
};

export default Main;
