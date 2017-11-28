import React from 'react'
import { Switch, Route } from 'react-router-dom'

import MerchantList from 'containers/Merchant/List'
import MerchantEdit from 'containers/Merchant/Edit'

import OrderList from 'containers/Order/List'

import CategoryEdit from 'containers/Category/Edit'
import CategoryList from 'containers/Category/List'

import GoodsList from 'containers/Goods/List'
import GoodsEdit from 'containers/Goods/Edit'

export default () => (
    <Switch>
        <Route path="/merchant-list" component={MerchantList} />
        <Route path="/merchant-edit" component={MerchantEdit} />
        <Route path="/order-list" component={OrderList} />
        <Route path="/category-list" component={CategoryList} />
        <Route path="/category-edit" component={CategoryEdit} />
        <Route path="/goods-list" component={GoodsList} />
        <Route path="/goods-edit" component={GoodsEdit} />
    </Switch>
);
