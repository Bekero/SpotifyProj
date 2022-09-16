import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disable } from 'workbox-navigation-preload';
import { setCurrPlayingSongIdx, setNextSong } from '../store/station.actions';


export function MediaPlayer() {

    const [player, setPlayer] = useState(null)
    // let currSongIdx = useSelector(state => state.stationModule.currSongIdx)
    const currentlyPlayingUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [currentlyPlayingUrl])

    const videoOnReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo()
    }

    const onReadyVideo = (event) => {
        console.log('event.target', event.target);
        setPlayer(event.target)
    }

    const onPauseVideo = (ev) => {
        player.pauseVideo()
    }

    const onPlayVideo = () => {
        player.playVideo()
    }

    const onNextVideo = () => {
        //  /currSongIdx++
        // dispatch(setNextSong())
        dispatch(setNextSong())
    }
    const onMuteVideo = () => {
        player.mute()
    }
    const onSetVolumeVideo = () => {
        player.unMute()
        player.seekTo(50)
    }
    // const videoTitle = player.videoTitle
    

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            currentlyPlayingUrl,
            autoplay: 1,
        },
    };

    return <div className='media-player-container'>
        {/* <h3>{videoTitle}</h3> */}
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPauseVideo}>Pause</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPlayVideo}>Play</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onNextVideo}>Next</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onMuteVideo}>Mute</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onSetVolumeVideo}>Unmute</button>
        {<h6></h6>}
        {currentlyPlayingUrl &&
            <YouTube
                videoId={currentlyPlayingUrl}
                opts={opts}
                VideoOnReady={videoOnReady}
                onReady={onReadyVideo}
            />
        }
    </div>

}