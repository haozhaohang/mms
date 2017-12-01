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
        if (equalByProps(this.props, prevProps, ['page', 'order_id', 'status', 'machine_no', 'start_time', 'end_time'])) {

            this.handleFetchList()
        }
    }

    handleFetchList() {
        const { page, page_size, order_id, status, machine_no, start_time, end_time, fetchOrderList } = this.props
   
        fetchOrderList({ page, page_size, order_id, status, machine_no, start_time, end_time });
    }

    handleSearch(value) {
        const { replaceQuery } = this.props
        
        replaceQuery(value)
    }

    handleChangePage({ current: page }) {
        const { updateQuery } = this.props

        updateQuery({ page })
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
        const { list, total, page_size, page, order_id, status, machine_no, start_time, end_time } = this.props

        const pagination = {
            page_size,
            total,
            current: page
        }
        return (
            <section className="merchant-list">
                <div className="filter-content">
                    <Filter
                        onSearch={this.handleSearch}
                        order_id={order_id}
                        status={status}
                        machine_no={machine_no}
                        start_time={start_time}
                        end_time={end_time}
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
    const { page, ...others } = URI.parseQuery(location.search)

    return {
        ...others,
        list,
        page_size: pageSize,
        total: Number(total),
        page: Number(page || 1)
    }
}

const mapDispatchToProps = { ...actions, ...router };

orderList.defaultProps = {
    status: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(orderList)
