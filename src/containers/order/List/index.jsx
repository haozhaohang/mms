import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Button, Table, Modal, notification } from 'antd'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/orderList'
import columns from './columns'
import Filter from './filter';

import './index.css'

const confirm = Modal.confirm;

class orderList extends PureComponent {
    constructor(props) {
        super(props)

        this.columns = columns(this)

        this.handleFetchList = this.handleFetchList.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        const { pageIndex, pageSize, fetchOrderList } = this.props
   
        fetchOrderList({ pageIndex, pageSize });
    }

    handleSubmit(value) {
        console.log('search', value)
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

    render() {
        const { list, total, pageIndex } = this.props

        return (
            <section className="merchant-list">
                <div className="filter-content">
                    <Filter
                        onSubmit={this.handleSubmit}
                    />
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

const mapStateToProps = ({ orderList }, { location }) => {
    const { list, pageIndex, pageSize, total } = orderList

    return {
        list,
        pageIndex,
        total,
        pageSize
    }
}

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(orderList)
