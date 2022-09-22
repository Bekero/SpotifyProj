import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsPlayingSong, setNextPrevSong, setPlayer } from '../store/song.actions';
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

export function MediaPlayer() {

    const currStation = useSelector(state => state.stationModule.currStation)
    const songIdx = useSelector(state => state.songModule.currSongIdx)
    const currPlayer = useSelector(state => state.songModule.player)
    // let player
    // const getSong()?.url = useSelector(state => state.stationModule.getSong()?.url)
    const [player, setPlayer] = useState(null)

    const [playSong, setPlay] = useState(false)
    const [songVolume, setSongVolume] = useState(50)
    const [isSongMuted, setSongMuted] = useState(false)
    const [songDuration, setSongDuration] = useState(0)
    const [songStartFrom, setSongStartFrom] = useState(0)
    const [songTimestamp, setSongTimestamp] = useState(0)
    const dispatch = useDispatch()
    const intervalRef = useRef()
    // song = currStation?.songs[songIdx]

    useEffect(() => {
        if (!player) return
        setPlay(true)
        if (!songDuration) {
            setSongDuration(player.getDuration())
        }
    }, [player, getSong()?.url, songDuration, songStartFrom])

    useEffect(() => {
        // dispatch(setCurrSongIsPlaying(playSong))
        if (playSong) {
            intervalRef.current = setInterval(() => {
                setSongTimestamp((prevTimestamp) => {
                    if (prevTimestamp + 1 >= songDuration) {
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

    function getSong() {
        // if (!currStation.songs && currentUrl) {
        //     return { url: currentUrl }
        // }
        if (!currStation || !currStation.songs || songIdx === undefined) return null
        return currStation.songs[songIdx]
    }

    const onReadyVideo = (event) => {
        // await dispatch(setPlayer(event.target))
        setPlayer(event.target)
        // player = currPlayer ? currPlayer : event.target

        // setPlayer(event.target)
        setSongDuration(event.target.getDuration())
        setSongTimestamp(0)
    }

    const onPauseVideo = (ev) => {
        player.pauseVideo()
        setPlay(false)
        dispatch(setIsPlayingSong(false))
    }

    const onPlayVideo = () => {
        player.playVideo()
        setPlay(true)
        dispatch(setIsPlayingSong(true))
    }

    const onNextVideo = async () => {
        await dispatch(setNextPrevSong(1))
        setSongTimestamp(0)
    }
    const onPrevVideo = async () => {
        await dispatch(setNextPrevSong(-1))
        setSongTimestamp(0)
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
            currentlyPlayingUrl: getSong()?.url,
            autoplay: 1,
        },
    };
    const condition = currStation?.createdBy?.fullname && getSong()?.title
    return <div className='media-player-container'>
        <div className='media-player-video-desc'>
            <div className='flex'>

                <div className='media-player-video-desc-img-holder'>
                    <img style={{ visibility: !condition ? "hidden" : "initial" }} src={condition ? currStation.createdBy.artistImg : ''} alt="" />
                </div>
                <div className='media-player-video-desc-name'>
                    {getSong()?.title && <div className='media-title'>{getSong()?.title}</div>}
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
                    <button disabled={getSong()?.url ? false : true} onClick={onPrevVideo}><Prev /></button>
                </div>
                {playSong ? <button className='media-player-play-stop-btn' disabled={getSong()?.url ? false : true} onClick={onPauseVideo}><Stop /></button> :
                    <button className='media-player-play-stop-btn' disabled={getSong()?.url ? false : true} onClick={onPlayVideo}><Play /></button>}
                <div className='player-control-right'>
                    <button disabled={getSong()?.url ? false : true} onClick={onNextVideo}><Next /></button>
                </div>
            </div>
            <div className='song-timestamp flex align-center'>
                <div className='song-timestamp-left'>{songTimestamp ? utilService.setTimestampToTime(songTimestamp) : '00:00'}</div>
                <input type="range" value={songTimestamp} disabled={getSong()?.url ? false : true} onChange={(ev) => handleSongStartFrom(ev)} min="0" max={songDuration.toString()} step="1" name="duration" id="duration" />
                <div className='song-timestamp-right'>{utilService.setTimestampToTime(songDuration)}</div>
            </div>
        </div>
        <div className='media-player-video-settings'>
            {(isSongMuted) ? <button disabled={getSong()?.url ? false : true} onClick={onSetVolumeVideo}><VolumeOn /></button> :
                <button disabled={getSong()?.url ? false : true} onClick={onMuteVideo}><VolumeOff /></button>}
            <input type="range" disabled={getSong()?.url ? false : true} onChange={(ev) => handleSongVolume(ev)} min="0" max="50" step="1" name="volume" id="volume" />
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