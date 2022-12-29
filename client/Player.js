import React from "react";

const Player = ({selectedAlbum, currentSong, audioState, next, previous, playClick}) => {
  return (
    <div id='player-controls' style={currentSong.id ? {visibility: 'visible'} : {visibility: 'hidden'}}>
      <div className='row center'>
        <i className='fa fa-step-backward' onClick={() => previous()}></i>
        <i className={`fa ${audioState ? 'fa-pause-circle' : 'fa-play-circle'}`} onClick={() => playClick()}></i>
        <i className='fa fa-step-forward' onClick={() => next()}></i>
      </div>
    </div>
  )
}

export default Player;