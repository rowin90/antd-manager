import React, { Fragment } from 'react';
import {
  Card,
  Button,
  Table,
  Form,
  Select,
  Modal,
  message,
  Input,
  DatePicker
} from 'antd';
import User_API from '@/api/user';
import history from '@/utils/history';
import Utils from '@/utils/utils';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

export default class UserList extends React.Component {
  state = {
    list: []
  };
  params = {
    // page:1
  };
  componentDidMount() {
    this.requestList();
  }

  handleSearch = values => {
    console.log(values);

    this.params = {
      ...this.params,
      ...values
    };
    this.requestList();
  };

  activeUser(user_id) {
    User_API.active({ user_id }).then(res => {
      message.success('激活成功!');
      this.requestList();
    });
  }

  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;

    User_API.search(this.params).then(res => {
      this.setState({ list: res.data.List });
    });
  };

  render() {
    let _this = this;
    const columns = [
      {
        title: '用户ID',
        dataIndex: 'user_id',
        key: '用户ID'
      },
      {
        title: '手机号',
        key: 'user_mobile',
        dataIndex: 'user_mobile'
      },
      {
        title: '所属应用',
        key: '批准文号',
        dataIndex: 'drug_license'
      },
      {
        title: '用户类型',
        key: 'user_type',
        dataIndex: 'user_type',
        render(user_type) {
          return user_type === 1
            ? '个人'
            : user_type === 2
            ? '药企'
            : '普通企业';
        }
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render(status) {
          return status === 1 ? '激活' : '未激活';
        }
      },
      {
        title: '注册时间',
        key: 'reg_time',
        dataIndex: 'reg_time',
        render(reg_time) {
          return moment(reg_time * 1000).format('YYYY-MM-DD');
        }
      },
      {
        title: '操作',
        key: '操作',
        dataIndex: 'operation',
        render(text, record) {
          return (
            <Fragment>
              <a
                href='javascript:;'
                onClick={() => {
                  history.push(
                    `/user/edit?type=edit&user_id=${record.user_id}`
                  );
                }}
                style={{ marginRight: 8 }}
              >
                编辑
              </a>
              <a
                href='javascript:;'
                onClick={() => {
                  history.push(
                    `/user/edit?type=open&user_id=${record.user_id}`
                  );
                }}
                style={{ marginRight: 8 }}
              >
                详情
              </a>
              {record.status === 0 && (
                <a
                  href='javascript:;'
                  onClick={() => {
                    confirm({
                      title: '确定激活该用户吗？',
                      okText: '确定',
                      cancelText: '取消',
                      onOk: () => {
                        _this.activeUser(record.user_id);
                      }
                    });
                  }}
                  style={{ marginRight: 8 }}
                >
                  激活
                </a>
              )}
            </Fragment>
          );
        }
      }
    ];
    return (
      <div>
        <Card>
          <FilterForm handleSearch={this.handleSearch} />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button
            type='primary'
            onClick={() => {
              this.props.history.push('/user/detail?type=add');
            }}
          >
            新增用户
          </Button>
        </Card>
        <div className='content-wrap'>
          <Table
            rowKey='user_id'
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
      </div>
    );
  }
}

class FilterForm extends React.Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      channel: 0,
      user_type: '0'
    });
  }

  handleFilter = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 处理数据
        let begin_time = Utils.Time.normTimeToStrNoMS(values.begin_time) || '0';
        let end_time =
          Utils.Time.normTimeToStrNoMS(values.end_time) ||
          parseInt(Date.now() / 1000).toString();

        values.reg_time = begin_time + ',' + end_time;
        values.user_type = Number(values.user_type);

        delete values.begin_time;
        delete values.end_time;

        this.props.handleSearch(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='inline' onSubmit={this.handleFilter}>
        <FormItem label='手机号'>
          {getFieldDecorator('mobile', {})(<Input type='phone' />)}
        </FormItem>
        <FormItem label='用户id'>
          {getFieldDecorator('user_id', {})(
            <Input type='number' style={{ width: '100px' }} />
          )}
        </FormItem>

        <FormItem label='注册时间'>
          {getFieldDecorator('begin_time')(<DatePicker format='YYYY-MM-DD' />)}
        </FormItem>
        <FormItem label='~' colon={false}>
          {getFieldDecorator('end_time')(<DatePicker format='YYYY-MM-DD' />)}
        </FormItem>
        <FormItem label='所属来源'>
          {getFieldDecorator('channel')(
            <Select>
              <Option value={0}>默认</Option>
              <Option value={1}>药路通</Option>
              <Option value={2}>医鹿康</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='用户类型'>
          {getFieldDecorator('user_type')(
            <Select style={{ width: '100px' }}>
              <Option value='0'>全部</Option>
              <Option value='1'>个人</Option>
              <Option value='2'>药企</Option>
              <Option value='3'>普通企业</Option>
            </Select>
          )}
        </FormItem>

        <FormItem>
          <Button type='primary' style={{ margin: '0 20px' }} htmlType='submit'>
            查询
          </Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);
