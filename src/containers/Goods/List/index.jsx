import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Button, Table, Modal, notification } from 'antd'
import URI from 'urijs'

import { equalByProps } from 'assets/js/util'
import * as actions from 'actions/goodsList'
import * as router from 'actions/router'
import columns from './columns'
import Filter from './filter'
import InventoryModal from './inventoryModal'

import './index.css'

const confirm = Modal.confirm;

class GoodsList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            inventory: false,
            rowVal: {}
        }

        this.columns = columns(this)

        this.handleFetchList = this.handleFetchList.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.handleInventory = this.handleInventory.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
    }

    componentDidMount() {
        this.handleFetchList()
    }

    componentDidUpdate(prevProps) {
        if (equalByProps(this.props, prevProps, ['page'])) {
            this.handleFetchList()
        }
    }

    handleFetchList() {
        const { page, page_size, name, status, fetchGoodsList } = this.props

        fetchGoodsList({ page, page_size, name, status });
    }

    handleSearch(value) {
        const { replaceQuery } = this.props
        
        replaceQuery(value)
    }

    handleChangeStatus({ id, status }) {
        const { fetchGoodsChangeStatus } = this.props
        const isOn = Number(status) === 10

        confirm({
            title: `您确定要${isOn ? '下线' : '上线'}门店?`,
            content: '请谨慎操作!',
            onOk: () => fetchGoodsChangeStatus({ id, isOn }).then( () => {
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

    handleInventory(value) {
        const { fetchGoodsInventory } = this.props

        fetchGoodsInventory(value).then(
            () => {
                notification.success({
                    message: '提示信息',
                    description: '库存设置成功'
                });

                this.handleState({ inventory: false })
                this.handleFetchList();
            }
        )
    }

    handleState(rest) {
        this.setState({
            ...rest
        })
    }

    render() {
        const { inventory, rowVal } = this.state
        const { list, total, page, name, status } = this.props

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
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={list}
                />
                <InventoryModal
                    visible={inventory}
                    value={rowVal}
                    onOk={this.handleInventory}
                    onCancel={() => this.handleState({ inventory: false })}
                />
            </section>
        )
    }
}

const mapStateToProps = ({ goodsList }, { location }) => {
    const { list, pageSize, total } = goodsList
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

GoodsList.defaultProps = {
    status: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsList)
