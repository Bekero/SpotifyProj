import { AppLibrary } from './cmps/app-library'
import { LikedSongs } from './cmps/app-liked-songs'
import { AppSearch } from './cmps/app-search'
import { GenreDetails } from './pages/genre-details'
import { HomePage } from './pages/home-page'
import { StationDetails } from './pages/station-details'

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
        component: <AppLibrary />,
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