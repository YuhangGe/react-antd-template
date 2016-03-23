import './home.less';
import Message from 'antd/lib/message';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import ValidateMixin from '../common/ValidateMixin.js';
import React from 'react';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 7},
  wrapperCol: {span: 12},
};

const INIT_FORM_DATA = {
  email: '',
  password: '',
  passwordRepeat: ''
};

const Home = React.createClass({
  mixins: [ValidateMixin],
  getInitialState() {
    return {
      formErrors: {},
      formData: {...INIT_FORM_DATA},
      formRules: {
        email: [{
          type: 'require',
          message: '邮箱不能为空'
        }, {
          type: 'email'
        }],
        password: [{
          type: 'require',
          name: '密码'
        }, {
          type: 'minLength',
          name: '密码',
          params: [6]
        }, {
          type: 'password'
        }],
        passwordRepeat: [{
          type: 'require',
          message: '请再次输入密码'
        }, {
          type: this.checkPasswordRepeat,
          message(name, arg) {
            console.log(name);
            console.log(arg);
            return `两次密码不一致`;
          },
          params() {
            return [this.state.formData.password]
          }
        }]
      }
    }
  },
  onEmailChange(evt) {
    const {formData, formRules} = this.state;
    formData.email = evt.target.value;
    this.validate('email', ...formRules.email);
    this.setState({
      formData
    });
  },
  onPasswordInput(evt) {
    const {formData, formRules} = this.state;
    formData.password = evt.target.value;
    this.validate('password', ...formRules.password);
  },
  onPasswordRepeat(evt) {
    const {formData, formRules} = this.state;
    formData.passwordRepeat = evt.target.value;
    this.validate('passwordRepeat', ...formRules.passwordRepeat);
    this.setState({
      formData
    });
  },
  checkPasswordRepeat(password, passwordRepeat) {
    return passwordRepeat === password;
  },
  handleSubmit() {
    if (!this.validateAll()) {
      Message.error('表单数据不合法, 请检查');
      return;
    }
    // do post formData;
    console.log(this.state.formData);
    Message.success('数据提交成功');
  },
  handleReset() {
    this.setState({
      formData: {...INIT_FORM_DATA},
      formErrors: {}
    });
  },
  render() {

    const {formData, formErrors} = this.state;

    return (
      <div className="container home">
        <p>表单示例</p>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="邮箱："
            validateStatus={formErrors.email ? 'error' : undefined}
            help={formErrors.email}
            hasFeedback>
            <Input value={formData.email}
                   onChange={this.onEmailChange}
                   type="email"
                   placeholder="请输入邮箱"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码："
            validateStatus={formErrors.password ? 'error' : undefined}
            help={formErrors.password}
            required
            hasFeedback>
            <Input value={formData.password}
                   onChange={this.onPasswordInput}
                   type="password"
                   placeholder="请输入密码"/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码："
            validateStatus={formErrors.passwordRepeat ? 'error' : undefined}
            help={formErrors.passwordRepeat}
            required
            hasFeedback>
            <Input value={formData.passwordRepeat}
                   onChange={this.onPasswordRepeat}
                   type="password"
                   placeholder="请输入密码"/>
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit}>确 定</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重 置</Button>
          </FormItem>
        </Form>
      </div>
    )
      ;
  }
});

export default Home;
