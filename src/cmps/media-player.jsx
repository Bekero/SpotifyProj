import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPlayingSong, setCurrSongIsPlaying, setNextPrevSong } from '../store/station.actions';
// import play from '../assets/img/play.png'
// import stop from '../assets/img/stop.png'
// import stop from '../assets/img/stop-song.svg'
import Stop from './svg/stop-song-svg'
// import Play from '../assets/img/play-song.svg'
import Play from './svg/play-song-svg'
import Next from './svg/next-song-svg'
import Prev from './svg/prev-song-svg'
import VolumeOn from './svg/volume-off-svg'
import VolumeOff from './svg/volume-on-svg'
import { utilService } from '../services/util.service';

// import next from '../assets/img/next-song.svg'
// import prev from '../assets/img/prev-song.svg'
// import unmute from '../assets/img/volume-on.svg'
// import mute from '../assets/img/volume-off.svg'
//* setShuffle() , getPlaylist() , getDuration()
//* React-Toastify
//* Google API you user search
//* react beautiful d&d

export function MediaPlayer() {

    const currStation = useSelector(state => state.stationModule.currStation)
    const song = useSelector(state => state.stationModule.currPlayingSong)
    const [player, setPlayer] = useState(null)
    const [playSong, setPlay] = useState(false)
    const [songVolume, setSongVolume] = useState(50)
    const [isSongMuted, setSongMuted] = useState(false)
    const [songDuration, setSongDuration] = useState(0)
    const [songStartFrom, setSongStartFrom] = useState(0)
    const [songTimestamp, setSongTimestamp] = useState(0)
    const currentlyPlayingUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    const dispatch = useDispatch()
    const intervalRef = useRef()
    // let videoTitle

    // const currentlyPlayingUrl = song.url

    useEffect(() => {
        if (!player) return
        console.log(player);
        setPlay(true)
        if (!songDuration) {
            setSongDuration(player.getDuration())
        }
    }, [player, song, currentlyPlayingUrl, songDuration, songStartFrom])

    useEffect(() => {
        dispatch(setCurrSongIsPlaying(playSong))
        // if (isSongEnded) {
        //     console.log(currStation);
        //     dispatch(setNextPrevSong(1))
        //     console.log(song);
        // }
        if (playSong) {
            intervalRef.current = setInterval(() => {
                setSongTimestamp((prevTimestamp) => {
                    if (prevTimestamp + 1 >= songDuration) {
                        console.log('asdasd');
                        onNextVideo()
                        clearInterval(intervalRef.current)
                        onPauseVideo()
                    }
                    return prevTimestamp + 1
                })
            }, 1000)
        }
        if (!playSong || songTimestamp >= songDuration) {
            clearInterval(intervalRef.current)
        }

    }, [playSong])

    useEffect(() => {
        if (!player) return
        setSongStartFrom(player.getCurrentTime())
    }, [player])

    const videoOnReady = (event) => {
        event.target.pauseVideo()
    }

    const onReadyVideo = async (event) => {
        setPlayer(event.target)
        setSongDuration(event.target.getDuration())
        setSongTimestamp(0)
    }

    const onPauseVideo = (ev) => {
        player.pauseVideo()
        setPlay(false)
    }

    const onPlayVideo = () => {
        player.playVideo()
        setPlay(true)
    }

    const onNextVideo = async () => {
        await dispatch(setNextPrevSong(1))
        setSongTimestamp(0)
        onPauseVideo()
    }
    const onPrevVideo = async () => {
        await dispatch(setNextPrevSong(-1))
        setSongTimestamp(0)
        onPauseVideo()
    }

    const onMuteVideo = () => {
        setSongVolume(player.getVolume())
        setSongMuted(true)
        player.setVolume(0)
    }

    const onSetVolumeVideo = () => {
        player.setVolume(songVolume)
        setSongMuted(false)
        // player.seekTo(50)
    }

    const handleSongVolume = (ev) => {
        const songVol = +ev.target.value
        player.setVolume(songVol)
        setSongMuted(songVol === 0 ? true : false)
    }

    const handleSongStartFrom = (ev) => {
        onPlayVideo()
        const songStartFromValue = +ev.target.value
        setSongTimestamp(songStartFromValue)
        player.seekTo(songStartFromValue)
        setSongStartFrom(songStartFromValue)
    }

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            currentlyPlayingUrl,
            autoplay: 1,
        },
    };
    const condition = currStation?.createdBy?.fullname && song.title
    return <div className='media-player-container'>
        <div className='media-player-video-desc'>
            <div className='flex'>

                <div className='media-player-video-desc-img-holder'>
                    <img style={{ visibility: !condition ? "hidden" : "initial" }} src={condition ? currStation.createdBy.artistImg : ''} alt="" />
                </div>
                <div className='media-player-video-desc-name'>
                    {song.title && <div className='media-title'>{song.title}</div>}
                    <div></div>
                    {condition && <div className='media-fullname'>{currStation.createdBy.fullname}</div>}
                </div>
                <button></button>
                <div></div>
            </div>
            {/* {videoTitle && <h3>{videoTitle}</h3>} */}
        </div>
        <div className='media-player-action'>
            <div className='media-player-btn-action'>
                <div className='player-control-left'>
                    <button disabled={currentlyPlayingUrl ? false : true} onClick={onPrevVideo}><Prev /></button>
                </div>
                {playSong ? <button className='media-player-play-stop-btn' disabled={currentlyPlayingUrl ? false : true} onClick={onPauseVideo}><Stop /></button> :
                    <button className='media-player-play-stop-btn' disabled={currentlyPlayingUrl ? false : true} onClick={onPlayVideo}><Play /></button>}
                <div className='player-control-right'>
                    <button disabled={currentlyPlayingUrl ? false : true} onClick={onNextVideo}><Next /></button>
                </div>
            </div>
            <div className='song-timestamp flex align-center'>
                <div className='song-timestamp-left'>{songTimestamp ? utilService.setTimestampToTime(songTimestamp) : '00:00'}</div>
                <input type="range" value={songTimestamp} disabled={currentlyPlayingUrl ? false : true} onChange={(ev) => handleSongStartFrom(ev)} min="0" max={songDuration.toString()} step="1" name="duration" id="duration" />
                <div className='song-timestamp-right'>{utilService.setTimestampToTime(songDuration)}</div>
            </div>
        </div>
        <div className='media-player-video-settings'>
            {(isSongMuted) ? <button disabled={currentlyPlayingUrl ? false : true} onClick={onSetVolumeVideo}><VolumeOn /></button> :
                <button disabled={currentlyPlayingUrl ? false : true} onClick={onMuteVideo}><VolumeOff /></button>}
            <input type="range" disabled={currentlyPlayingUrl ? false : true} onChange={(ev) => handleSongVolume(ev)} min="0" max="50" step="1" name="volume" id="volume" />
        </div>
        {currentlyPlayingUrl &&
            <YouTube
                style={{ display: "none" }}
                videoId={currentlyPlayingUrl}
                opts={opts}
                VideoOnReady={videoOnReady}
                onReady={onReadyVideo}
            />
        }
    </div>

}