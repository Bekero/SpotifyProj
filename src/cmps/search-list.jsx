import { SearchPreview } from "./search-preview";


export function SearchList({ addSongToPlaylist, playCurrUrl, songDuration, addToLikedPlaylist, songDetails }) {
    console.log('songDetails from SearchList', songDetails);
    if (!songDetails || !songDetails.length) return
    return (

        <div className="search-songs-list-container">
            {songDetails.map((song, idx) => {
                return <SearchPreview
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