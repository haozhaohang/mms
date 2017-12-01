// import React, { PureComponent } from 'react'

export default function() {
    return [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '已销售量',
                dataIndex: 'number'
            },
            {
                title: '实际应付金额',
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
            }
        ];
}