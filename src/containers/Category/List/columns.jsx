import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import moment from 'moment'

import { CATEGORY_STATUS } from 'constants/basic'

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
                dataIndex: 'create_time',
                render: val => moment.unix(val).format('YYYY-MM-DD')
            },
            {
                title: '分类顺序',
                dataIndex: 'sequence'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: val => CATEGORY_STATUS[val]
            },
            {
                title: '操作',
                className: 'row-operation',
                width: 120,
                render: value => (
                    <div>
                        <Link to={`/category-edit?id=${value.id}`}>
                            <Icon type="edit" /> 编辑
                        </Link>
                        <a onClick={() => component.handleChangeStatus(value)}>
                            {Number(value.status) === 10 ? '下线' : '上线'}
                        </a>
                    </div>
                )
            }
        ];
}