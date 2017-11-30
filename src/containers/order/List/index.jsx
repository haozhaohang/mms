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
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleRefund = this.handleRefund.bind(this)
        this.handleRepetitionBill = this.handleRepetitionBill.bind(this)
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

    handleChangePage({ current: pageIndex }) {
        const { updateQuery } = this.props

        updateQuery({ pageIndex })
    }

    handleRefund({ order_id, pay_money }) {
        const { fetchRefund } = this.props

        confirm({
            title: `您确定要退款码?`,
            content: '请谨慎操作!',
            onOk: () => fetchRefund({ order_id, refund_money: pay_money }).then( () => {
                notification.success({
                    message: '提示信息',
                    description: '退款成功'
                });
                this.handleFetchList();
            })
        });
        
        fetchRefund({ order_id, refund_money: pay_money })
    }

    handleRepetitionBill({ order_id }) {
        const { fetchRepeatPrint } = this.props

        confirm({
            title: `您确定要重打单吗?`,
            content: '请谨慎操作!',
            onOk: () => fetchRepeatPrint({ order_id }).then( () => {
                notification.success({
                    message: '提示信息',
                    description: '重打单成功'
                });
            })
        });
    }

    render() {
        const { list, total, pageSize, pageIndex, order_id, status, startTime, endTime } = this.props
        console.log(status)
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

orderList.defaultProps = {
    status: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(orderList)
