import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Button, Table, Modal } from 'antd'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/merchantList'
import columns from './columns'
import Filter from './filter';

import './index.css'

const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: 'Do you Want to delete these items?',
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

class MerchantList extends PureComponent {
    constructor(props) {
        super(props)

        this.columns = columns(this)

        this.handleFetchList = this.handleFetchList.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
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
        const { pageIndex, pageSize, fetchMerchantList } = this.props

        fetchMerchantList({ pageIndex, pageSize });
    }

    handleSubmit(value) {
        console.log('search', value)
    }

    handleChangeStatus({ id, status }) {
        const { fetchMerchantChangeStatus } = this.props;

        // confirm({
        //     title: '您确定要下线门店?',
        //     content: '请谨慎操作!',
        //     onOk: () => fetchMerchantChangeStatus({ id }),
        //     onCancel() {
        //         console.log('Cancel');
        //     },
        // });

        Modal.confirm({
            title: '确定要启用吗?',
            content: '启用后用户将可以办理该会员卡',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                fetchMerchantChangeStatus({id});
            }
        });
        // showConfirm()
    }

    render() {
        const { list, total, pageIndex } = this.props

        return (
            <section className="merchant-list">
                <div>
                    <NavLink to="/merchant-edit">
                        <Button type="primary" icon="plus">新增门店</Button>
                    </NavLink>
                </div>
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

const mapStateToProps = ({ merchantList }, { location }) => {
    console.log(location.search)
    const { list, pageIndex, pageSize, total } = merchantList
    return {
        list,
        pageIndex,
        total,
        pageSize
    }
}

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(MerchantList)
