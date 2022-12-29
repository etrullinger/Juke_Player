import React from 'react';

const Songs = ({selectedAlbum, currentSong, songClick}) => {
 return (
    <table id='songs'>
      <tbody>
        <tr className='gray'>
          <td />
          <td>#</td>
          <td>Name</td>
          <td>Artist</td>
          <td>Genre</td>
        </tr>
        {
          selectedAlbum.songs.map((song) => {
            return (
              <tr key={song.id} className={currentSong === song ? 'active' : ''}>
                <td onClick={() => songClick(song)}>
                  <i className='fa fa-play-circle' style={currentSong === song ? {visibility: 'hidden'} : {visibility: 'visible'}} />
                </td>
                <td>{song.id}</td>
                <td>{song.name}</td>
                <td>{selectedAlbum.artist.name}</td>
                <td>{song.genre}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Songs;