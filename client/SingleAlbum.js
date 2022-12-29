import React from 'react';
import Songs from './Songs';

const SingleAlbum = ({selectedAlbum, playAudio, currentSong, songClick}) => {
  return (
    <div id='single-album' className='column'>
      <div className='album'>
        <a>
          <img src={selectedAlbum.artworkUrl} />
          <p>ALBUM {selectedAlbum.id}</p>
          <small>{selectedAlbum.artist.name}</small>
        </a>
      </div>
      <Songs 
        selectedAlbum={selectedAlbum} 
        currentSong={currentSong} 
        songClick={songClick}
      />
    </div>
  )
}

export default SingleAlbum;