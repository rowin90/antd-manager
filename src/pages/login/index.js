import React from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';
import User_API from '@/api/user';
import history from '@/utils/history';
import { setUserInfo_STORAGE } from '@/utils/storage';

const FormItem = Form.Item;
@Form.create()
class Login extends React.Component {
  handleSubmit() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        User_API.login(values).then(res => {
          let token = res.data.token;
          setUserInfo_STORAGE(token);
          history.push('/home');
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title='登录水平表单' style={{ marginTop: 10 }}>
          <Form style={{ width: 300 }}>
            <FormItem>
              {getFieldDecorator('user_name', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '用户名不能为空'
                  },
                  {
                    min: 4,
                    max: 10,
                    message: '长度不在范围内'
                  },
                  {
                    pattern: new RegExp('^\\w+$', 'g'),
                    message: '用户名必须为字母或者数字'
                  }
                ]
              })(
                <Input
                  prefix={<Icon type='user' />}
                  placeholder='请输入用户名'
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('pwd', {
                initialValue: '',
                rules: []
              })(
                <Input
                  prefix={<Icon type='lock' />}
                  type='password'
                  placeholder='请输入密码'
                />
              )}
            </FormItem>
            {/* <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a href='#' style={{ float: 'right' }}>
                忘记密码
              </a>
            </FormItem> */}
            <FormItem>
              <Button type='primary' onClick={this.handleSubmit.bind(this)}>
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Login;
