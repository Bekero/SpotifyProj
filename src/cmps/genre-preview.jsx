import { Link } from "react-router-dom";

export function GenrePreview() {


    return (
        <div>
            <Link to={`/genre/shalom`}>
                <h2>Hello from Genre preview</h2>
            </Link>
        </div>
    )
}