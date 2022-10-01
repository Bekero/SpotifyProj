import { SearchPreview } from "./search-preview";


export function SearchList({ addSongToPlaylist, playCurrUrl, songDuration, addToLikedPlaylist, songDetails, user }) {
    if (!songDetails || !songDetails.length) return
    return (

        <div className="search-songs-list-container">
            {songDetails.map((song, idx) => {
                return <SearchPreview
                    user={user}
                    song={song}
                    songDetails={songDetails[idx]}
                    songDuration={songDuration[idx]}
                    key={song.id}
                    playCurrUrl={playCurrUrl}
                    addToLikedPlaylist={addToLikedPlaylist}
                    addSongToPlaylist={addSongToPlaylist}
                />
            }
            )}
        </div>
    )
}