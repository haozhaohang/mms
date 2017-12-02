import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Button, Table, Modal, notification } from 'antd'
import URI from 'urijs'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/merchantList'
import * as router from 'actions/router'
import columns from './columns'
import Filter from './filter';

import './index.css'

const confirm = Modal.confirm;

class MerchantList extends PureComponent {
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
        if (equalByProps(this.props, prevProps, ['page', 'merchant_name',  'status',  'start_time', 'end_time'])) {
            this.handleFetchList()
        }
    }

    handleFetchList() {
        const { page, pageSize, merchant_name, status, start_time, end_time, fetchMerchantList } = this.props

        fetchMerchantList({ page, merchant_name, status, start_time, end_time, page_size: pageSize });
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

    handleChangePage({ current: page }) {
        const { updateQuery } = this.props

        updateQuery({ page })
    }

    render() {
        const { list, total, page, pageSize, loading, merchant_name, status, start_time, end_time } = this.props
        const pagination = {
            pageSize,
            total,
            current: page
        }

        return (
            <section className="merchant-list">
                <div className="filter-content">
                    <Filter
                        merchant_name={merchant_name}
                        status={status}
                        start_time={start_time}
                        end_time={end_time}
                        onSearch={this.handleSearch}
                    />
                </div>
                <div className="func-content">
                    <Link to="/merchant-edit">
                        <Button type="primary" icon="plus">新增门店</Button>
                    </Link>
                </div>
                <div>
                    <Table
                        bordered
                        loading={loading}
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

const mapStateToProps = ({ merchantList }, { location }) => {
    const { list, pageSize, total, loading } = merchantList
    const { page, ...others } = URI.parseQuery(location.search);

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

MerchantList.defaultProps = {
    status: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantList)
