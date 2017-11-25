import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Provider } from 'react-redux'

import Layout from 'containers/Layout'

export default function RouteTree({ store }) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="router-content">
                    <Switch>
                        <Route path="/" component={Layout} />
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    )
}