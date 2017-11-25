import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Provider } from 'react-redux'

import Layout from 'containers/Layout'

export default function RouteTree({ store, indexPath }) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="router-content">
                    <Switch>
                        {/* <Route path="/" component={Layout} /> */}
                        <Redirect exact from="/" to={indexPath} />
                        <Route path="/" component={Layout} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    )
}