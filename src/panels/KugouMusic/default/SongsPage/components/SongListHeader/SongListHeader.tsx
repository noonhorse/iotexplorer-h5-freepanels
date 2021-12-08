import React, { useContext } from 'react';
import { KugouContext } from '@src/panels/KugouMusic/default/app';
import { useHistory } from 'react-router-dom';
import { usePlayMode } from '@src/panels/KugouMusic/default/hooks/usePlayMode';
import { controlDevice, controlPlayMode } from '@src/models/kugou';
import { PLAY_MODE_KEY } from '@src/panels/KugouMusic/default/constants';
import { iconPlayAll } from '@icons/kugou';
import { syncPlayQueueAndSong } from '@src/panels/KugouMusic/default/utils/syncPlayQueueAndSong';
import { Song } from '@src/panels/KugouMusic/default/types';

interface Props {
  curSongs: Song[];
  curListId: number | string;
  total: number;
  playType: 'album' | 'playlist' | 'newSongs' | 'recommendDaily';
}

export const SongListHeader = ({ playType, curSongs, curListId, total }: Props) => {
  const { kugouState, dispatch } = useContext(KugouContext);
  const history = useHistory();
  const [playModeText, playModeIcon] = usePlayMode();

  const { deviceData } = kugouState;
  const PlayMode = deviceData[PLAY_MODE_KEY];

  // 切换播放模式
  const handleTogglePlayMode = () => {
    let next_play_mode;
    if (PlayMode === 2) {
      next_play_mode = 0;
    } else {
      next_play_mode = PlayMode + 1;
    }
    controlDevice(controlPlayMode, next_play_mode);
  };

  return (
    <header className="list-main-header">
      <div className="left" onClick={async () => {
        // 找到第一个能播放的歌曲
        const songIndex = curSongs.findIndex(item => (item.playable_code === 0 || item.playable_code === 3));
        const song = curSongs[songIndex];
        syncPlayQueueAndSong(playType, curListId, song, songIndex, kugouState, dispatch).then(() => {
          history.push('/musicPlayer');
        });
      }}>
        <img className="iconPlayAll" src={iconPlayAll}/>
        <span>全部播放 （{total}）</span>
      </div>
      <div className="right" onClick={handleTogglePlayMode}>
        <img className="icon-playMode" src={playModeIcon}/>
        <span>{playModeText}</span>
      </div>
    </header>
  );
};
