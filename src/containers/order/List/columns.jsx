import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd'

import { MERCHANT_STATUS } from 'constants/basic'

export default function(component) {
    return [
            {
                title: '订单号',
                dataIndex: 'order_id'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '购买商品',
                dataIndex: 'order_item',
                render: (val = []) => val.map(({ goods_name, goods_num }, index) => (
                    <div key={index}>{goods_name} ×{goods_num}</div>)
                )
            },
            {
                title: '总金额',
                dataIndex: 'total_money'
            },
            {
                title: '折扣金额',
                dataIndex: 'discount_money'
            },
            {
                title: '实际支付金额',
                dataIndex: 'pay_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            }
        ];
}