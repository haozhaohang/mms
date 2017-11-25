import React, { Component } from 'react';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import { login } from 'actions/user';
import 'babel-polyfill'

import './index.css'

const FormItem = Form.Item;

@Form.create()
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        errorMsg: '',
        showError: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.userLogin = this.userLogin.bind(this)
  }

  async userLogin(params) {
      let payload;
      this.setState({
        isLoading: true,
        showError: false
      })

      try {
          payload = await login(params);
      } catch (e) {
        this.setState({
          isLoading: false,
          errorMsg: e.data.msg,
          showError: true
        })
          return;
      }

      this.setState({
        isLoading: false
      })

      location.href = '/'
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((errors, values) => {
      if (errors) {
          return;
      }

      this.userLogin(values);
    });
  }

  renderMessage(message) {
      return (
        <Alert
            style={{ marginBottom: 24 }}
            message={message}
            type="error"
            showIcon
          />
      );
  }

  render() {
    const { isLoading, showError } = this.state
      const { form: { getFieldDecorator } } = this.props;

      return (
        <div className="login">
          <div className="top">
            <div className="header">
              <a href="/">
                <img alt="" className="logo" src="https://gw.alipayobjects.com/zos/rmsportal/NGCCBOENpgTXpBWUIPnI.svg" />
                <span className="title">
                  Ant Design
                </span>
              </a>
            </div>
            <p className="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</p>
          </div>

          <div className="main">
            <Form onSubmit={this.handleSubmit}>
                  {
                      showError &&
                      this.renderMessage('账户或密码错误')
                  }

                <FormItem>
                      {getFieldDecorator('user_name', {
                          rules: [{
                              required: true, message: '请输入账户名！',
                          }],
                      })(
                        <Input
                            size="large"
                            prefix={<Icon type="user" className="prefixIcon" />}
                            placeholder="账号"
                          />
                      )}
                  </FormItem>

                  <FormItem>
                      {getFieldDecorator('password', {
                          rules: [{
                              required: true, message: '请输入密码！',
                          }],
                      })(
                        <Input
                            size="large"
                            prefix={<Icon type="lock" className="prefixIcon" />}
                            type="password"
                            placeholder="密码"
                          />
                      )}
              </FormItem>

                <FormItem className="additional">
                    <Button
                        size="large"
                        className="submit"
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                      >
                        登录
                      </Button>
                  </FormItem>
              </Form>
          </div>
        </div>
      );
  }
}
