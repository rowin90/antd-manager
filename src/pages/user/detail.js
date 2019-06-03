import React from 'react';
import User_API from '@/api/user';
import Utils from '@/utils/utils';
import history from '@/utils/history';
import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');
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
  drug_id = Utils.url_request('drug_id') || '';

  componentDidMount() {}
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 过滤数据
        let data = this._filterAjaxData(values);

        if (this.type === 'add') {
          User_API.add({ data }).then(res => {
            message.success('添加成功！');
            history.push('/user/list');
          });
        }
      }
    });
  };

  // 过滤提交数据
  _filterAjaxData(values) {
    console.log(values);

    values.type = Number(values.type);

    return values;
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
          <Form.Item label='用户名'>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(<Input type='text' {...isDisabled} />)}
          </Form.Item>
          <Form.Item label='密码'>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(<Input type='text' {...isDisabled} />)}
          </Form.Item>

          <Form.Item label='用户类型'>
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择用户类型!' }]
            })(
              <Radio.Group {...isDisabled}>
                <Radio value='0'>个人</Radio>
                <Radio value='1'>药企</Radio>
                <Radio value='2'>普通企业</Radio>
              </Radio.Group>
            )}
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

export default Form.create({ name: 'user_detail' })(UserDetail);
