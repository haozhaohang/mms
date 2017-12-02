import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Button, Table, Modal, notification, Row, Col, Icon } from 'antd'
import URI from 'urijs'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/statList'
import * as router from 'actions/router'
import columns from './columns'
import Filter from './filter'
import Card from './card'

import './index.css'

const confirm = Modal.confirm;

class StatList extends PureComponent {
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
        const { pageIndex, page_size, order_id, status, startTime, endTime, fetchStatList } = this.props
   
        fetchStatList({ pageIndex, page_size, startTime, endTime });
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
        const { netFee, shop, goodsList, pageIndex, order_id, status, startTime, endTime } = this.props

        const topColResponsiveProps = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 6,
            style: { marginBottom: 24 },
        };

        return (
            <section className="stat-list">
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
                    <Row type="flex" justify="space-between">
                        <Col {...topColResponsiveProps}>
                            <Card
                                info={{
                                    name: '总金额',
                                    tip: '包含网费和超市收入',
                                    number: netFee.number + shop.number,
                                    pay_money: netFee.pay_money + shop.pay_money,
                                    total_money: netFee.total_money + shop.total_money,
                                    discount_money: netFee.discount_money + shop.discount_money
                                }}
                            />
                        </Col>
                        <Col {...topColResponsiveProps}>
                            <Card
                                info={{
                                    tip: '只包含网费收入',
                                    ...netFee
                                }}
                            />
                        </Col>
                        <Col {...topColResponsiveProps}>
                            <Card
                                info={{
                                    tip: '只包含超市收入',
                                    ...shop
                                }}
                            />
                        </Col>
                    </Row>
                </div>
                <Table
                    columns={this.columns}
                    dataSource={goodsList}
                    pagination={false}
                />
            </section>
        )
    }
}

const mapStateToProps = ({ statList }, { location }) => {

    const { pageIndex, ...others } = URI.parseQuery(location.search)

    return {
        ...statList,
        ...others,
    }
}

const mapDispatchToProps = { ...actions, ...router };

StatList.defaultProps = {
    status: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(StatList)
