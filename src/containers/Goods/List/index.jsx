import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Button, Table, Modal, notification } from 'antd'
import URI from 'urijs'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/goodsList'
import * as router from 'actions/router'
import columns from './columns'
import Filter from './filter';

import './index.css'

const confirm = Modal.confirm;

class GoodsList extends PureComponent {
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
        if (equalByProps(this.props, prevProps, ['pageIndex'])) {
            this.handleFetchList()
        }
    }

    handleFetchList() {
        const { pageIndex, pageSize, name, status, fetchGoodsList } = this.props

        fetchGoodsList({ pageIndex, pageSize, name, status });
    }

    handleSearch(value) {
        const { replaceQuery } = this.props
        
        replaceQuery(value)
    }

    handleChangeStatus({ id, status }) {
        const { fetchMerchantChangeStatus } = this.props
        const isOn = Number(status) === 10

        confirm({
            title: `您确定要${isOn ? '下线' : '上线'}门店?`,
            content: '请谨慎操作!',
            onOk: () => fetchMerchantChangeStatus({ id, isOn }).then( () => {
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
        const { list, total, pageIndex, name, status } = this.props

        return (
            <section className="merchant-list">
                <div className="filter-content">
                    <Filter
                        name={name}
                        status={status}
                        onSearch={this.handleSearch}
                    />
                </div>
                <div className="func-content">
                    <NavLink to="/goods-edit">
                        <Button type="primary" icon="plus">新增单品</Button>
                    </NavLink>
                </div>
                <div>
                    <Table
                        bordered
                        columns={this.columns}
                        dataSource={list}
                    />
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ goodsList }, { location }) => {
    const { list, pageSize, total } = goodsList
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

GoodsList.defaultProps = {
    status: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList)
