import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Button, Table, Modal, notification } from 'antd'
import URI from 'urijs'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/orderList'
import * as router from 'actions/router'
import columns from './columns'
import Filter from './filter';

import './index.css'

const confirm = Modal.confirm;

class orderList extends PureComponent {
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
        if (equalByProps(this.props, prevProps, ['pageIndex', 'order_id', 'status', 'startTime', 'endTime'])) {

            this.handleFetchList()
        }
    }

    handleFetchList() {
        const { pageIndex, pageSize, order_id, status, startTime, endTime, fetchOrderList } = this.props
   
        fetchOrderList({ pageIndex, pageSize, order_id, status, startTime, endTime });
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
        const { list, total, pageSize, pageIndex, order_id, status, startTime, endTime } = this.props

        const pagination = {
            pageSize,
            total,
            current: pageIndex
        }
        return (
            <section className="merchant-list">
                <div className="filter-content">
                    <Filter
                        onSearch={this.handleSearch}
                        order_id={order_id}
                        status={status}
                        startTime={startTime}
                        endTime={endTime}
                    />
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

const mapStateToProps = ({ orderList }, { location }) => {
    const { list, pageSize, total } = orderList
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

export default connect(mapStateToProps, mapDispatchToProps)(orderList)
