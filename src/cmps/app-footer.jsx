
import YouTube, { YouTubeProps } from 'react-youtube';
import React from 'react'
import { MediaPlayer } from './media-player';

export class AppFooter extends React.Component {

    render() {
        return (
            <div className="app-footer now-playing-bar">
                <MediaPlayer />
            </div>
        )
    }
}