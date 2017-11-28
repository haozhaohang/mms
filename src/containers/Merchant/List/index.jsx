import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
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
        if (equalByProps(this.props, prevProps, ['pageIndex', 'merchant_name',  'owner_telephone',  'startTime', 'endTime'])) {
            this.handleFetchList()
        }
    }

    handleFetchList() {
        const { pageIndex, pageSize, merchant_name, owner_telephone, startTime, endTime, fetchMerchantList } = this.props

        fetchMerchantList({ pageIndex, pageSize, merchant_name, owner_telephone, startTime, endTime });
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
        const { list, total, pageIndex, pageSize, merchant_name, owner_telephone, startTime, endTime } = this.props
        const pagination = {
            pageSize,
            total,
            current: pageIndex
        }

        return (
            <section className="merchant-list">
                <div className="filter-content">
                    <Filter
                        merchant_name={merchant_name}
                        owner_telephone={owner_telephone}
                        startTime={startTime}
                        endTime={endTime}
                        onSearch={this.handleSearch}
                    />
                </div>
                <div className="func-content">
                    <NavLink to="/merchant-edit">
                        <Button type="primary" icon="plus">新增门店</Button>
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

const mapStateToProps = ({ merchantList }, { location }) => {
    const { list, pageSize, total } = merchantList
    const { pageIndex, ...others } = URI.parseQuery(location.search);

    return {
        ...others,
        list,
        pageSize,
        total: Number(total),
        pageIndex: Number(pageIndex || 1)
    }
}

const mapDispatchToProps = { ...actions, ...router };

export default connect(mapStateToProps, mapDispatchToProps)(MerchantList)
