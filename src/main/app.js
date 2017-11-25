import React, { PureComponent } from 'react';
import RouteTree from './router';
import { LOGIN_URL } from 'constants/basic';

import initializeState from './initState';
import createStore from './store'

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

        const store = createStore(initState);

        this.setState({ initState, store });
    }

    render() {
        const { initState, store } = this.state;

        if (!initState || !store) {
            return <h3>加载中</h3>;
        }

        // const { menu } = initState;
        // const indexPath = menu[0].path || menu[0].children[0].children[0].path;

        // return <RouteTree store={store} history={history} indexPath={indexPath} />

        return <RouteTree store={store} />;
    }
}
