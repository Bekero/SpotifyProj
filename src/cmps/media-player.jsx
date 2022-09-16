import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextSong } from '../store/station.actions';

//* setShuffle() , getPlaylist() , getDuration()
//* React-Toastify
//* Google API you user search
//* react beautiful d&d

export function MediaPlayer() {

    const [player, setPlayer] = useState(null)
    const currentlyPlayingUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    const dispatch = useDispatch()

    // useEffect(() => {}, [currentlyPlayingUrl])

    const videoOnReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo()
    }

    const onReadyVideo = (event) => {
        setPlayer(event.target)
    }

    const onPauseVideo = (ev) => {
        player.pauseVideo()
    }

    const onPlayVideo = () => {
        player.playVideo()
    }

    const onNextVideo = () => {
        // currSongIdx++
        // dispatch(setNextSong())
        dispatch(setNextSong(1))
    }

    const onMuteVideo = () => {
        player.mute()
    }

    const onSetVolumeVideo = () => {
        player.unMute()
        player.seekTo(50)
    }
    // const videoTitle = player.videoTitle
    // console.log('player :', player.videoTitle)

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
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPauseVideo}>Pause</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPlayVideo}>Play</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onNextVideo}>Next</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onMuteVideo}>Mute</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onSetVolumeVideo}>Unmute</button>
        {/* {videoTitle && <h3>{videoTitle}</h3>} */}
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