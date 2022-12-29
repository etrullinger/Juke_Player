import React from 'react';

const Sidebar = ({resetAlbumInView, setAlbumInView}) => {
  return (
    <div id='sidebar'>
      <img src='juke.svg' id='logo' />
      <section>
        <h4>
          <a onClick={() => setAlbumInView(resetAlbumInView)}>ALBUMS</a>
        </h4>
      </section>
    </div>
  )
}

export default Sidebar;