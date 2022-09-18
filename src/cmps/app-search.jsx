import React from 'react'
import { GenreList } from './genre-list'

export class AppSearch extends React.Component {

    render() {
        return (
            <div className="app-search">
                {/* <h2> Hello From Search App </h2> */}
                <GenreList />
            </div>
        )
    }
}