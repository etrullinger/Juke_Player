import React from 'react';

const AllAlbums = ({albums, albumClick}) => {
  return (
    <div id='albums' className='row wrap'>
      {
        albums.map((album) => {
          return (
            <div className='album' key={album.id}>
              <a onClick={() => albumClick(album.id)}>
                <img src={album.artworkUrl} />
                <p>ALBUM {album.id}</p>
                <small>{album.artist.name}</small>
              </a>
            </div>
          )
        })
      }
    </div>
  )
}

export default AllAlbums;