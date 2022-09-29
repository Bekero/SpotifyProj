import FilledLikeToolBar from "./svg/filled-like-tool-bar"
import UnfilledLikeToolBar from "./svg/unfilled-like-tool-bar"
import OptsSvg from './svg/opts-song'
import PauseSongSvg from '../cmps/svg/pause-song-svg'
import PlaySong from '../cmps/svg/play-song-svg'
import { Draggable } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux"
import { utilService } from "../services/util.service"

export function SongPreview({ station, currSong, songIdx, currStation, playHover, playCurrUrl, addToLikedPlaylist, addToPlaylist, user }) {

    const isPlayingSong = useSelector(state => state.songModule.isPlayingSong)

    const isSongPlaying = useSelector(state => state.songModule.isPlayingSong)
    const currSongIdx = useSelector(state => state.songModule.currSongIdx)

    //? player from stationReducer is undefined , need to understand why /

    function isSongLiked(songId) {
        if (!user) return false
        return user.likedSongs?.some(song => song.id === songId)
    }

    if (!station && !user) return <div>Loading...</div>
    return <>
        {
            <Draggable key={currSong.id} draggableId={currSong.id} index={songIdx}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={`song-preview ${(isPlayingSong && currSongIdx === songIdx) ? 'active' : ''}`}>
                        <div className="song-number-play">
                            {isSongPlaying && currSongIdx === songIdx ? <div className="pause-video" onClick={() => { station ? playCurrUrl(songIdx, station._id, undefined, false) : playCurrUrl(songIdx, undefined, user, false) }}><button><PauseSongSvg /></button></div>
                                :
                                <div>
                                    <div className="play-song-preview"><button onClick={() => { station ? playCurrUrl(songIdx, station._id, undefined, true) : playCurrUrl(songIdx, undefined, user, true) }}>{<PlaySong />}</button></div>
                                    <div className="song-index">{songIdx + 1}</div>
                                </div>
                                // <div> {songHover ? <div className="play-song-preview"><button onClick={() => { station ? playCurrUrl(songIdx, station._id, undefined, true) : playCurrUrl(songIdx, undefined, user, true) }}>{<PlaySong />}</button></div>
                                //     :
                                //     <div className="song-index">{songIdx + 1}</div>}</div>
                            }
                        </div>
                        <div className='song-list-title-container'>
                            <div className='song-list-title-img-container'>
                                <img className="song-img" src={`${currSong?.imgUrl}`} />
                            </div>
                            <div className='song-list-title'>
                                <div className="song-title">{currSong.title}</div>
                            </div>
                        </div>
                        <div className='date-added'>
                            <span>{new Date(+currSong?.addedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="opts-menu-section flex align-center justify-center">
                            <button onClick={() => addToLikedPlaylist(currSong)} className={isSongLiked(currSong.id) ? "is-liked-song-preview" : "like-song-preview"}>{isSongLiked(currSong.id) ? <FilledLikeToolBar /> : <UnfilledLikeToolBar />}</button>
                            <div className="song-duration-container">{utilService.setTimestampToTime(currSong.songDuration)}</div>
                            <button onClick={(ev) => addToPlaylist(ev, currSong)} className="add-to-playlist-btn" ><OptsSvg /></button>
                        </div>
                    </div>
                )}
            </Draggable>
        }
    </>
}