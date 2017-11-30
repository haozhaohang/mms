import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd'
import moment from 'moment'

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
                dataIndex: 'total_money',
                render: val => `${val}元`
            },
            {
                title: '折扣金额',
                dataIndex: 'discount_money',
                render: val => `${val}元`
            },
            {
                title: '实际支付金额',
                dataIndex: 'pay_money',
                render: val => `${val}元`
            },
            {
                title: '支付时间',
                dataIndex: 'pay_time',
                render: val => moment.unix(val).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '状态',
                dataIndex: 'status_desc'
            },
            {
                title: '操作',
                className: 'row-operation',
                render: val => (
                    <div>
                        {
                            Number(val.status) === 8 ? (
                                <a onClick={() => component.handleRefund(val)}>
                                    退款
                                </a>
                            ) : (
                                <a disabled>
                                    已退款
                                </a>
                            )
                        }
                        
                        <a onClick={() => component.handleRepetitionBill(val)}>
                            重打单
                        </a>
                    </div>
                )
            }
        ];
}