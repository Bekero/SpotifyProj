import React from 'react';
import { Routes, Route } from 'react-router'
import routes from './routes'
import { SideNav } from './cmps/side-nav'
import { AppFooter } from './cmps/app-footer'

export class RootCmp extends React.Component {

    render() {
        return (
            <div className="app-container">
                <SideNav />
                <main className="home-app-container grid">
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    </Routes>
                </main>
                <AppFooter />
            </div>
        )
    }
}



