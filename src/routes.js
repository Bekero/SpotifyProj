import { LikedSongs } from './pages/app-liked-songs'
import { AppSearch } from './cmps/app-search'
import { GenreDetails } from './pages/genre-details'
import { HomePage } from './pages/home-page'
import { StationDetails } from './pages/station-details'
import { StationLibrary } from './pages/station-library'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
    },
    {
        path: '/search',
        component: <AppSearch />,
    },
    {
        path: '/collection/playlist',
        component: <StationLibrary />,
    },
    {
        path: '/collection/track',
        component: <LikedSongs />,
    },
    {
        path: '/playlist/:stationId',
        component: <StationDetails />,
    },
    {
        path: '/genre/:label',
        component: <GenreDetails />,
    },
]

export default routes