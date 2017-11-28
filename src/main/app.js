import React, { PureComponent } from 'react';
import { Spin } from 'antd';
import createHistory from 'history/createBrowserHistory'

import { LOGIN_URL } from 'constants/basic';
import RouteTree from './router';
import initializeState from './initState';
import createStore from './store'

const history = createHistory()

export default class App extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            initState: null,
            store: null
        };
    }

    componentDidMount() {
        this.initializeState();
    }

    async initializeState() {
        let initState;

        try {
            initState = await initializeState();
        } catch (e) {
            location.href = LOGIN_URL;
            return;
        }

        if (!initState) {
            return;
        }

        const store = createStore(initState, history);

        this.setState({ initState, store });
    }

    render() {
        const { initState, store } = this.state;
        if (!initState || !store) {
            return (
                <div className="loading-container">
                    <Spin size="large" />
                </div>
            );
        }

        const { menu } = initState;

        const indexPath = menu[0].chidren[0].path;

        return <RouteTree store={store} indexPath={indexPath} history={history} />;
    }
}
