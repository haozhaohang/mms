import React, { PureComponent } from 'react'
import { Button, Row, Col, Icon, Tooltip } from 'antd'

class Card extends PureComponent {

    render() {
        const { info } = this.props
        console.log(info)
        return (
            <div className="stat-card">
                <div className="title">
                    <span>{info.name}</span>
                    <span className="icon">
                        <Tooltip placement="top" title={info.tip}>
                            <Icon type="exclamation-circle-o" />
                        </Tooltip>
                    </span>
                </div>
                <p className="text">
                    ¥ {info.pay_money}
                </p>
                <div className="stat-info">
                    <div>
                        <div>
                            应收金额：{info.total_money}
                        </div>
                        <div>
                            折扣金额： {info.discount_money}
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    实际收入金额：990
                </div>
            </div>
        )
    }
}

export default Card
