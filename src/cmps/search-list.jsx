import { SearchPreview } from "./search-preview";


export function SearchList({data}) {
    console.log(data,'list')
    return (
        
        <div className="songs-list">
            {data.map(song =>
            <SearchPreview song = {song}
            key = {song.id.videoId}
            />  
                )}
        </div>
    )
}