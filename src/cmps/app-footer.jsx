
import YouTube, { YouTubeProps } from 'react-youtube';
import React from 'react'
import { SongPlay } from './song-play';

export class AppFooter extends React.Component {

    render() {
        return (
            <div className="app-footer now-playing-bar">
                <h2> Hello from Footer </h2>
                <SongPlay />
            </div>
        )
    }
}