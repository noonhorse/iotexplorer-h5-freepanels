import React, { useContext } from 'react';
import { KugouContext } from '@src/panels/KugouMusic/default/app';
import { iconClose } from '@icons/kugou';
import './PlayFloatWindow.less';
import { useHistory } from 'react-router-dom';
import { musicDefaultImg } from '@src/panels/KugouMusic/default/MusicPlayer/MusicPlayer';

export const PlayFloatWindow = () => {
  const { kugouState, setShowPlayFloat } = useContext(KugouContext);
  const { currentPlaySong: song } = kugouState;
  const history = useHistory();
  return (
    <div className="PlayFloatWindow">
      <img className="albumImg" src={ song ? song.album_img_mini : musicDefaultImg} onClick={() => {
        history.push('/musicPlayer');
      }}/>

      <div className="right">
        <img className="iconClose" src={iconClose} onClick={() => {
          setShowPlayFloat(false);
        }}/>
      </div>
    </div>
  );
};
