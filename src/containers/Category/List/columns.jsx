import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'antd'

import { MERCHANT_STATUS } from 'constants/basic'

export default function(component) {
    return [
            {
                title: '分类名称',
                dataIndex: 'name'
            },
            {
                title: '分类描述',
                dataIndex: 'desc'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '分类顺序',
                dataIndex: 'sequence'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '操作',
                className: 'row-operation',
                render: value => (
                    <div>
                        <NavLink to={`/category-edit?id=${value.id}`}>
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