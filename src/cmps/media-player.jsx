import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPlayingSongIdx, setIsPlayingSong, changeSong, setPlayer } from '../store/song.actions';
// import play from '../assets/img/play.png'
// import stop from '../assets/img/stop.png'
// import stop from '../assets/img/stop-song.svg'
import Stop from './svg/stop-song-svg'
// import Play from '../assets/img/play-song.svg'
import Play from './svg/play-song-svg'
import Next from './svg/next-song-svg'
import Prev from './svg/prev-song-svg'
import Shuffle from './svg/shuffle-song-svg.jsx'
import Repeat from './svg/repeat-song-svg.jsx'
import VolumeOn from './svg/volume-off-svg'
import VolumeOff from './svg/volume-on-svg'
import { utilService } from '../services/util.service';
import { PhoneModal } from './phone-modal';

export function MediaPlayer() {

    const currStation = useSelector(state => state.stationModule.currStation)
    const songIdx = useSelector(state => state.songModule.currSongIdx)
    const currPlayer = useSelector(state => state.songModule.player)
    const isPlayingSong = useSelector(state => state.songModule.isPlayingSong)
    // let player
    // const getSong()?.url = useSelector(state => state.stationModule.getSong()?.url)
    const [player, setPlayer] = useState(null)

    const [playSong, setPlay] = useState(false)
    const [songEnded, setSongEnded] = useState(false)
    const [repeatSong, setRepeatSong] = useState(false)
    const [isShuffleSong, setIsShuffleSong] = useState(false)
    const [isSongMuted, setSongMuted] = useState(false)
    const [toggleModal, setToggleModal] = useState(false)
    const [songVolume, setSongVolume] = useState(50)
    const [songDuration, setSongDuration] = useState(0)
    const [songStartFrom, setSongStartFrom] = useState(0)
    const [songTimestamp, setSongTimestamp] = useState(0)
    const dispatch = useDispatch()
    const intervalRef = useRef()

    useEffect(() => {
        if (!player) return
        setPlay(true)
        if (!songDuration) {
            setSongDuration(player.getDuration())
        }
    }, [player, getSong()?.url, songDuration, songStartFrom])



    useEffect(() => {
        // dispatch(setCurrSongIsPlaying(playSong))
        if (songEnded) return
        if (playSong && isPlayingSong) {
            intervalRef.current = setInterval(() => {
                setSongTimestamp(prevTimestamp => {
                    if (prevTimestamp + 1 >= songDuration) {
                        setSongEnded(true)
                        clearInterval(intervalRef.current)
                        // onPauseVideo()
                    }
                    return prevTimestamp + 1
                })
            }, 1000)
        }
        if ((!playSong && !isPlayingSong) || songTimestamp >= songDuration) {
            clearInterval(intervalRef.current)
        }

    }, [playSong, songEnded, isPlayingSong])

    useEffect(() => {
        if (songEnded) isSongEnded()
        if (!player) return
        setSongStartFrom(player.getCurrentTime())
        if (!isPlayingSong) onPauseVideo()
        else onPlayVideo()
    }, [player, songEnded, isPlayingSong])

    function getSong() {
        // if (!currStation.songs && currentUrl) {
        //     return { url: currentUrl }
        // }
        if (!currStation || !currStation.songs || songIdx === undefined) return null
        return currStation.songs[songIdx]
    }
    const isSongEnded = async () => {
        if (isShuffleSong) {
            let randomSongIdx = utilService.getRandomIntInclusive(0, currStation.songs.length - 1)
            while (randomSongIdx === songIdx) {
                randomSongIdx = utilService.getRandomIntInclusive(0, currStation.songs.length - 1)
            }
            await dispatch(setCurrPlayingSongIdx(randomSongIdx))
            onPlayVideo()
            return
        }
        if (!repeatSong) {
            onChangeSong(1)
        } else {
            await dispatch(changeSong(0))
            onSetTimestamp(0)
        }
        await onPlayVideo()
    }

    const onReadyVideo = (event) => {
        setPlayer(event.target)
        setSongDuration(event.target.getDuration())
        setSongTimestamp(0)
        setSongEnded(false)
        setPlay(true)
    }

    const onPauseVideo = async (ev) => {
        ev?.stopPropagation()
        player.pauseVideo()
        await dispatch(setIsPlayingSong(false))
        setPlay(false)
    }

    const onPlayVideo = async (ev) => {
        ev?.stopPropagation()
        player.playVideo()
        console.log(isPlayingSong);
        if (isPlayingSong) return
        await dispatch(setIsPlayingSong(true))
        console.log(isPlayingSong);
        await setPlay(true)
    }

    const onChangeSong = async (diff, ev) => {
        ev.stopPropagation()
        await dispatch(changeSong(diff))
        setSongTimestamp(0)
    }

    const onSetTimestamp = async (timestamp) => {
        setSongEnded(false)
        setSongTimestamp(timestamp)
        player.seekTo(timestamp)
    }
    const onIncreaseDecreaseTenSeconds = async (diff) => {
        setSongTimestamp(songTimestamp + diff)
        player.seekTo(songTimestamp)
    }

    const onShuffle = async (ev) => {
        ev.stopPropagation()
        setIsShuffleSong(!isShuffleSong)
    }

    const onRepeat = (ev) => {
        ev.stopPropagation()
        setRepeatSong(!repeatSong)
    }

    const onMuteVideo = () => {
        setSongVolume(player.getVolume())
        setSongMuted(true)
        player.setVolume(0)
    }

    const onSetVolumeVideo = (ev) => {
        ev?.stopPropagation()
        player.setVolume(songVolume)
        setSongMuted(false)
        // player.seekTo(50)
    }

    const handleSongVolume = (ev) => {
        ev?.stopPropagation()
        const songVol = +ev.target.value
        player.setVolume(songVol)
        setSongMuted(songVol === 0 ? true : false)
    }

    const handleSongStartFrom = (ev) => {
        ev?.stopPropagation()
        onPlayVideo()
        const songStartFromValue = +ev.target.value
        setSongTimestamp(songStartFromValue)
        player.seekTo(songStartFromValue)
        setSongStartFrom(songStartFromValue)
    }

    const onToggleModal = (ev) => {
        ev.stopPropagation()
        setToggleModal(!toggleModal)
    }

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            currentlyPlayingUrl: getSong()?.url,
            autoplay: 1,
        },
    };
    const condition = currStation?.createdBy?.fullname && getSong()?.title
    return <div className='media-player-container' onClick={onToggleModal}>
        {(window.innerWidth <= 600 && getSong()) && <PhoneModal onToggleModal={onToggleModal} repeatSong={repeatSong} isShuffleSong={isShuffleSong} onRepeat={onRepeat} onShuffle={onShuffle} songTimestamp={songTimestamp} songDuration={songDuration} handleSongStartFrom={handleSongStartFrom} station={currStation} isPlayingSong={isPlayingSong} toggleModal={toggleModal} getSong={getSong} onChangeSong={onChangeSong} onPauseVideo={onPauseVideo} onPlayVideo={onPlayVideo} />}
        <div className='media-player-video-desc'>
            <div className='media-player-video-desc-child flex'>

                <div className='media-player-video-desc-img-holder'>
                    <img style={{ visibility: !condition ? "hidden" : "initial" }} src={condition ? currStation.songs[songIdx].imgUrl : ''} alt="" />
                </div>
                <div className='media-player-video-desc-name'>
                    {getSong()?.title && <div className='media-title'>{getSong()?.title}</div>}
                    <div></div>
                    {condition && <div className='media-fullname'>{currStation.createdBy.fullname}</div>}
                </div>
            </div>
            {/* {videoTitle && <h3>{videoTitle}</h3>} */}
        </div>
        <div className='media-player-action'>
            <div className='media-player-btn-action'>
                <div className='player-control-left'>
                    <button className='shuffle-btn' disabled={getSong()?.url ? false : true} onClick={onShuffle}><Shuffle isShuffleSong={isShuffleSong} /></button>
                    {/* <button disabled={getSong()?.url ? false : true} onClick={() => onIncreaseDecreaseTenSeconds(-5)}>-5</button> */}
                    <button className='change-song-btn' disabled={getSong()?.url ? false : true} onClick={(ev) => onChangeSong(-1, ev)}><Prev /></button>
                </div>
                {(isPlayingSong) ? <button className='media-player-play-stop-btn' disabled={getSong()?.url ? false : true} onClick={onPauseVideo}><Stop /></button> :
                    <button className='media-player-play-stop-btn' disabled={getSong()?.url ? false : true} onClick={onPlayVideo}><Play /></button>}
                <div className='player-control-right'>
                    <button className='change-song-btn' disabled={getSong()?.url ? false : true} onClick={(ev) => onChangeSong(1, ev)}><Next /></button>
                    {/* <button disabled={getSong()?.url ? false : true} onClick={() => onIncreaseDecreaseTenSeconds(5)}>+5</button> */}
                    <button className='repeat-btn' disabled={getSong()?.url ? false : true} onClick={onRepeat}><Repeat repeatSong={repeatSong} /></button>
                </div>
            </div>
            <div className='song-timestamp flex align-center'>
                <div className='song-timestamp-left'>{songTimestamp ? utilService.setTimestampToTime(songTimestamp) : '00:00'}</div>
                <div className='song-range-container'><input className='slider' type="range" value={songTimestamp} disabled={getSong()?.url ? false : true} onChange={(ev) => handleSongStartFrom(ev)} min="0" max={songDuration.toString()} step="1" name="duration" id="duration" />
                </div>
                <div className='song-timestamp-right'>{utilService.setTimestampToTime(songDuration)}</div>
            </div>
        </div>
        <div className='media-player-video-settings'>
            {(isSongMuted) ? <button disabled={getSong()?.url ? false : true} onClick={onSetVolumeVideo}><VolumeOn /></button> :
                <button disabled={getSong()?.url ? false : true} onClick={onMuteVideo}><VolumeOff /></button>}
            <div className='song-range-container flex'><input className='slider' type="range" disabled={getSong()?.url ? false : true} onChange={(ev) => handleSongVolume(ev)} min="0" max="50" step="1" name="volume" id="volume" />
            </div>
        </div>
        {(getSong()?.url) &&
            <YouTube
                style={{ display: "none" }}
                videoId={getSong()?.url}
                opts={opts}
                onReady={onReadyVideo}
            />
        }
    </div>

}