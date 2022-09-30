import React from 'react'
import { useEffect } from 'react'

export const OptsMenu = ({ addToPlaylistModal, modalPos, addToPlaylist, ArrowInOptsMenu, myStations, onAddToMyPlaylist }) => {
    useEffect(() => {
        console.log('hello')
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])
    return <>
        <ul style={{ transform: `translate(${modalPos.posX}px, ${modalPos.posY}px)` }} className="song-list-opts-menu">
            <li>Create Playlist</li>
            <li className="add-to-playlist-section" onMouseOver={() => addToPlaylist(true)}><ArrowInOptsMenu style={{ transform: `rotate(270deg)` }} />Add To Playlist </li>
            <li disabled>Remove</li>
            <li>Smth Else</li>
        </ul>
        {
            addToPlaylistModal &&
            <ul className="add-to-playlist-modal" style={{ transform: `translate(${modalPos.posX - 165}px, ${modalPos.posY - 160}px)` }}>
                {myStations.map((station, myPlaylistIdx) =>
                    <li key={myPlaylistIdx}>
                        <div onClick={() => onAddToMyPlaylist(myPlaylistIdx)}>Add to {station.name}</div>
                    </li>)}
            </ul>
        }
    </>

}
