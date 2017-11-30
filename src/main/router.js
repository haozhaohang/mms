import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import Layout from 'containers/Layout'

export default function RouteTree({ store, indexPath, history }) {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div className="router-content">
                    <Switch>
                        <Redirect exact from="/" to={indexPath} />
                        <Route path="/" component={Layout} />
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>
    )
}