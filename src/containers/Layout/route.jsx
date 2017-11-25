import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MerchantList from 'containers/Merchant/List'
import MerchantEdit from 'containers/Merchant/Edit'

import GoodsList from 'containers/Goods/List'
import GoodsEdit from 'containers/Goods/Edit'

export default () => (
    <Switch>
        <Route path="/merchant-list" component={MerchantList} />
        <Route path="/merchant-edit" component={MerchantEdit} />
        <Route path="/goods-list" component={GoodsList} />
        <Route path="/goods-edit" component={GoodsEdit} />
    </Switch>
);
