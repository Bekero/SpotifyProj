import { SearchPreview } from "./search-preview";


export function SearchList({ data, playCurrUrl, addToLikedPlaylist, songDetails }) {
    console.log(data, 'list')
    return (

        <div className="search-songs-list-container">
            {data.map((song, idx) => {
                return <SearchPreview song={song}
                    songDetails={songDetails[idx]}
                    key={song.id.videoId}
                    playCurrUrl={playCurrUrl}
                    addToLikedPlaylist={addToLikedPlaylist}
                />
            }
            )}
        </div>
    )
}