import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd'

import { MERCHANT_STATUS } from 'constants/basic'

export default function(component) {
    return [
            {
                title: '门店名称',
                dataIndex: 'merchant_name'
            },
            {
                title: '机器数量',
                dataIndex: 'machines'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '联系电话',
                dataIndex: 'tel'
            },
            {
                title: '手机号',
                dataIndex: 'owner_telephone'
            },
            {
                title: '门店地址',
                dataIndex: 'address'
            },
            {
                title: '操作',
                className: 'row-operation',
                render: value => (
                    <div>
                        <NavLink to={`/merchant-edit?id=${value.id}`}>
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