import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd'

import { GOODS_STATUS } from 'constants/basic'

export default function(component) {
    return [
            {
                title: '单品名称',
                dataIndex: 'name'
            },
            {
                title: '单品图片',
                dataIndex: 'image',
                render: val => <img src={val} width="100" height="100" alt="单品图片" />
            },
            {
                title: '单位',
                dataIndex: 'unit'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: val => `${val}元`
            },
            {
                title: '库存数量',
                dataIndex: 'stock_num'
            },
            {
                title: '售卖数量',
                dataIndex: 'sale_num'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: val => GOODS_STATUS[val]
            },
            {
                title: '操作',
                className: 'row-operation',
                width: 120,
                render: value => (
                    <div>
                        <NavLink to={`/goods-edit?id=${value.id}`}>
                            <Icon type="edit" /> 编辑
                        </NavLink>
                        <a onClick={() => component.handleChangeStatus(value)}>
                            {Number(value.status) === 10 ? '下线' : '上线'}
                        </a>
                    </div>
                )
            }
        ];
}