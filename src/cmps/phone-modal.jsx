import Next from './svg/next-song-svg'
import Prev from './svg/prev-song-svg'
import Stop from './svg/stop-song-svg'
import Play from './svg/play-song-svg'
import Shuffle from './svg/shuffle-song-svg.jsx'
import Repeat from './svg/repeat-song-svg.jsx'
import CloseModal from './svg/close-modal-svg'

import { utilService } from '../services/util.service'

export const PhoneModal = ({ isShuffleSong, onToggleModal, repeatSong, onRepeat, onShuffle, toggleModal, getSong, onChangeSong, isPlayingSong, onPlayVideo, onPauseVideo, station, songTimestamp, handleSongStartFrom, songDuration }) => {
    return (
        <div className={`phone-modal ${toggleModal ? 'open-phone-modal' : ''}`}>
            <div className='phone-modal-header'>
                <div>
                    <button className='close-modal-btn' onClick={onToggleModal}><CloseModal /></button>
                </div>
                <div>
                    {station.name}
                </div>
                <div></div>
            </div>
            <img src={getSong().imgUrl} />
            <div className='song-timestamp flex align-center'>
                <div className='song-timestamp-left'>{songTimestamp ? utilService.setTimestampToTime(songTimestamp) : '00:00'}</div>
                <div className='song-range-container-phone-mode'><input className='slider' type="range" value={songTimestamp} onChange={(ev) => handleSongStartFrom(ev)} min="0" max={songDuration.toString()} step="1" name="duration" id="duration" />
                </div>
                <div className='song-timestamp-right'>{utilService.setTimestampToTime(songDuration)}</div>
            </div>
            <div className='phone-mode-actions'>
                <button className='shuffle-btn' onClick={onShuffle}><Shuffle isShuffleSong={isShuffleSong} /></button>
                <button className='change-song-btn' onClick={(ev) => onChangeSong(-1, ev)}><Prev /></button>
                {(isPlayingSong) ? <button className='media-player-play-stop-btn' onClick={onPauseVideo}><Stop /></button> :
                    <button className='media-player-play-stop-btn' onClick={onPlayVideo}><Play /></button>}
                <button className='change-song-btn' onClick={(ev) => onChangeSong(1, ev)}><Next /></button>
                <button className='repeat-btn' onClick={onRepeat}><Repeat repeatSong={repeatSong} /></button>
                {/* {getSong()?.title && <div className='media-title'>{getSong()?.title}</div>} */}
            </div>

        </div>
    )
}