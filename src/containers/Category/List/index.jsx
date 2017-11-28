import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Button, Table, Modal, notification } from 'antd'
import URI from 'urijs'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/categoryList'
import * as router from 'actions/router'
import columns from './columns'
import Filter from './filter';

import './index.css'

const confirm = Modal.confirm;

class CategoryList extends PureComponent {
    constructor(props) {
        super(props)

        this.columns = columns(this)

        this.handleFetchList = this.handleFetchList.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
    }

    componentDidMount() {
        this.handleFetchList()
    }

    componentDidUpdate(prevProps) {
        if (equalByProps(this.props, prevProps, ['pageIndex', 'name',  'status', 'startTime', 'endTime'])) {
            this.handleFetchList()
        }
    }

    handleFetchList() {
        const { pageIndex, pageSize, name, status, startTime, endTime, fetchCategoryList } = this.props

        fetchCategoryList({ pageIndex, pageSize, name, status, startTime, endTime });
    }

    handleSearch(value) {
        const { replaceQuery } = this.props
        
        replaceQuery(value)
    }

    handleChangeStatus({ id, status }) {
        const { fetchCategoruChangeStatus } = this.props
        const isOn = Number(status) === 10

        confirm({
            title: `您确定要${isOn ? '下线' : '上线'}门店?`,
            content: '请谨慎操作!',
            onOk: () => fetchCategoruChangeStatus({ id, isOn }).then( () => {
                notification.success({
                    message: '提示信息',
                    description: '设置成功'
                });
                this.handleFetchList();
            })
        });
    }

    handleChangePage({ current: pageIndex }) {
        const { updateQuery } = this.props

        updateQuery({ pageIndex })
    }

    render() {
        const { list, total, pageIndex, pageSize, name, status, startTime, endTime } = this.props

        const pagination = {
            pageSize,
            total,
            current: pageIndex
        }

        return (
            <section className="merchant-list">
                <div className="filter-content">
                    <Filter
                        name={name}
                        status={status}
                        startTime={startTime}
                        endTime={endTime}
                        onSearch={this.handleSearch}
                    />
                </div>
                <div className="func-content">
                    <NavLink to="/category-edit">
                        <Button type="primary" icon="plus">新增商品分类</Button>
                    </NavLink>
                </div>
                <div>
                    <Table
                        bordered
                        columns={this.columns}
                        dataSource={list}
                        pagination={pagination}
                        onChange={this.handleChangePage}
                    />
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ categoryList }, { location }) => {
    const { list, pageSize, total } = categoryList
    const { pageIndex, ...others } = URI.parseQuery(location.search)

    return {
        ...others,
        list,
        pageSize,
        total: Number(total),
        pageIndex: Number(pageIndex || 1)
    }
}

const mapDispatchToProps = { ...actions, ...router };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
