import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Button, Table, Modal, notification } from 'antd'
import URI from 'urijs'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/orderList'
import * as router from 'actions/router'
import columns from './columns'
import Filter from './filter'
import RefundModal from './refundModal'

import './index.css'

const confirm = Modal.confirm;

class orderList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            refundVisible: false,
            rowVal: {}
        }

        this.columns = columns(this)

        this.handleFetchList = this.handleFetchList.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.handleRefund = this.handleRefund.bind(this)
        this.handleRepetitionBill = this.handleRepetitionBill.bind(this)
        this.handleState = this.handleState.bind(this)
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
        const { page, pageSize, order_id, status, machine_no, start_time, end_time, fetchOrderList } = this.props
   
        fetchOrderList({ page, order_id, status, machine_no, start_time, end_time, page_size: pageSize });
    }

    handleSearch(value) {
        const { replaceQuery } = this.props
        
        replaceQuery(value)
    }

    handleChangePage({ current: page }) {
        const { updateQuery } = this.props

        updateQuery({ page })
    }

    handleRefund(value) {
        const { fetchRefund } = this.props

        if (Number(value.order_type) === 2) {
            this.handleState({ refundVisible: true, rowVal: value })

            return;
        }

        confirm({
            title: `您确定要退款码?`,
            content: '请谨慎操作!',
            onOk: () => fetchRefund({ order_id: value.order_id, refund_money: value.pay_money }).then( () => {
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
    
    handleState(rest) {
        this.setState({
            ...rest
        })
    }

    render() {
        const { refundVisible, rowVal } = this.state
        const { list, total, pageSize, page, loading, order_id, status, machine_no, start_time, end_time, fetchRefund } = this.props

        const pagination = {
            pageSize,
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
                <Table
                    bordered
                    loading={loading}
                    columns={this.columns}
                    dataSource={list}
                    pagination={pagination}
                    onChange={this.handleChangePage}
                />
                <RefundModal
                    visible={refundVisible}
                    value={rowVal}
                    onOk={params => fetchRefund(params)}
                    onCancel={() => this.handleState({ refundVisible: false })}
                />
            </section>
        )
    }
}

const mapStateToProps = ({ orderList }, { location }) => {
    const { list, pageSize, total, loading } = orderList
    const { page, ...others } = URI.parseQuery(location.search)

    return {
        ...others,
        list,
        loading,
        pageSize,
        total: Number(total),
        page: Number(page || 1)
    }
}

const mapDispatchToProps = { ...actions, ...router };

orderList.defaultProps = {
    status: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(orderList)
