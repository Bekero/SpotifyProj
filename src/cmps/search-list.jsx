import { SearchPreview } from "./search-preview";

export function SearchList({ setIsLoading, addSongToPlaylist, playCurrUrl, songDuration, addToLikedPlaylist, songDetails, user, }) {

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