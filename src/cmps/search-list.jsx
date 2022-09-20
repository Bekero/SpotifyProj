import { SearchPreview } from "./search-preview";


export function SearchList({ data, playCurrUrl }) {
    console.log(data, 'list')
    return (

        <div className="songs-list">
            {data.map(song =>
                <SearchPreview song={song}
                    key={song.id.videoId}
                    playCurrUrl={playCurrUrl}
                />
            )}
        </div>
    )
}