import { SearchPreview } from "./search-preview";


export function SearchList({ data, playCurrUrl, addToLikedPlaylist }) {
    console.log(data, 'list')
    return (

        <div className="search-songs-list-container">
            {data.map(song =>{
                return <SearchPreview song={song}
                    key={song.id.videoId}
                    playCurrUrl={playCurrUrl}
                    addToLikedPlaylist={addToLikedPlaylist}
                />
                }
            )}
        </div>
    )
}