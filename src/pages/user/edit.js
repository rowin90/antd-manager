import React from 'react';
import User_API from '@/api/user';
import Utils from '@/utils/utils';
import history from '@/utils/history';
import moment from 'moment';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
  Input,
  DatePicker,
  message
} from 'antd';

const { Option } = Select;

class UserDetail extends React.Component {
  type = Utils.url_request('type') || '';
  user_id = Utils.url_request('user_id') || '';

  componentDidMount() {
    if (this.type === 'edit' || this.type === 'open') {
      // 编辑 \ 详情 页面
      this._renderUserInfo(this.user_id);
    }
  }
  handleSubmit = e => {
    e.preventDefault();

    if (this.type === 'open') {
      // 查看
      history.push('/user/list');
      return;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 过滤数据
        let data = this._filterAjaxData(values);

        if (this.type === 'edit') {
          // 编辑
          User_API.edit({ data }).then(res => {
            message.success('编辑成功！');
            history.push('/user/list');
          });
        }
      }
    });
  };

  // 过滤提交数据
  _filterAjaxData(values) {
    values.birthday = Utils.Time.normTimeToStrNoMS(values.birthday) || '0';
    return values;
  }

  // 渲染数据
  async _renderUserInfo(user_id) {
    let { data } = await User_API.detail({ user_id });

    data.birthday = data.birthday ? moment(data.birthday * 1000) : undefined;
    data.register_time = data.register_time
      ? moment(data.register_time * 1000)
      : undefined;

    this.props.form.setFieldsValue(data);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const isDisabled = {
      disabled: this.type === 'open' ? true : false
    };
    return (
      <div className='content-wrap'>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={{ marginTop: '20px' }}
        >
          <Form.Item label='用户id'>
            {getFieldDecorator('user_id', {})(<Input type='text' disabled />)}
          </Form.Item>
          <Form.Item label='头像'>
            {getFieldDecorator('avatar', {})(
              <Input type='text' {...isDisabled} />
            )}
          </Form.Item>
          <Form.Item label='合同编号'>
            {getFieldDecorator('contract_id', {
              rules: [{ required: true, message: '请输入合同编号!' }]
            })(<Input type='text' {...isDisabled} />)}
          </Form.Item>
          <Form.Item label='合同状态'>
            {getFieldDecorator('contract_status', {
              rules: [{ required: true, message: '请输入合同状态!' }]
            })(<Input type='text' {...isDisabled} />)}
          </Form.Item>

          <Form.Item label='注册渠道'>
            {getFieldDecorator('channel', {
              rules: [{ required: true, message: '请选择注册渠道!' }]
            })(
              <Radio.Group {...isDisabled}>
                <Radio value={0}>个人</Radio>
                <Radio value={1}>药企</Radio>
                <Radio value={2}>普通企业</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='生日'>
            {getFieldDecorator('birthday', {})(<DatePicker {...isDisabled} />)}
          </Form.Item>
          <Form.Item label='邮箱'>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱!' }]
            })(<Input type='text' {...isDisabled} />)}
          </Form.Item>
          <Form.Item label='性别'>
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: '请选择性别!' }]
            })(
              <Radio.Group {...isDisabled}>
                <Radio value={0}>未知</Radio>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label='等级'>
            {getFieldDecorator('level', {
              rules: [{ required: true, message: '请输入等级!' }]
            })(<Input type='text' {...isDisabled} />)}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type='primary' htmlType='submit'>
              确定
            </Button>
            <Button
              style={{ marginLeft: '20px' }}
              onClick={() => history.goBack()}
            >
              返回
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'validate_other' })(UserDetail);
