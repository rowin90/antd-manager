import React, { Fragment } from 'react';
import { Card, Button, Table, Form, Select, Modal, message, Input } from 'antd';
import Drug_API from '@/api/drug';
import history from '@/utils/history';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

export default class DrugList extends React.Component {
  state = {
    list: []
  };
  params = {
    // page:1
  };
  componentDidMount() {
    // this.requestList();
  }

  handleSearch = values => {
    values.type = Number(values.type);
    this.params = {
      ...this.params,
      ...values
    };
    this.requestList();
  };

  delDrug(drug_id) {
    Drug_API.delete({ drug_id }).then(res => {
      message.success('删除成功!');
      this.requestList();
    });
  }

  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    // Drug_API.search(this.params).then(res => {
    //   let list = res.result.item_list.map((item, index) => {
    //     item.key = index;
    //     return item;
    //   });
    //   this.setState({
    //     list: list,
    //     pagination: Utils.pagination(res, current => {
    //       _this.params.page = current;
    //       _this.requestList();
    //     })
    //   });
    // });
    Drug_API.search(this.params).then(res => {
      this.setState({ list: res.data.List });
    });
  };

  render() {
    let _this = this;
    const columns = [
      {
        title: '药品ID',
        dataIndex: 'ID',
        key: '药品ID'
      },
      {
        title: '药品名称',
        key: '药品名称',
        dataIndex: 'drug_name'
      },
      {
        title: '批准文号',
        key: '批准文号',
        dataIndex: 'drug_license'
      },
      {
        title: '生产厂家',
        key: '生产厂家',
        dataIndex: 'manufacturer_name'
      },
      {
        title: '药品类型',
        key: '药品类型',
        dataIndex: 'drug_type',
        render(drug_type) {
          return drug_type == 1 ? '西药' : '中成药';
        }
      },
      {
        title: '更新时间',
        key: '更新时间',
        dataIndex: 'update_time',
        render(update_time) {
          return moment(update_time * 1000).format('YYYY-MM-DD');
        }
      },
      {
        title: '状态',
        key: '状态',
        dataIndex: 'franchisee_name',
        render(status) {
          return status == 1 ? '上架' : '下架';
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
                  history.push(`/drug/detail?type=edit&drug_id=${record.ID}`);
                }}
                style={{ marginRight: 8 }}
              >
                编辑
              </a>
              <a
                href='javascript:;'
                onClick={() => {
                  history.push(`/drug/detail?type=open&drug_id=${record.ID}`);
                }}
                style={{ marginRight: 8 }}
              >
                详情
              </a>
              <a
                href='javascript:;'
                onClick={() => {
                  confirm({
                    title: '确定删除该药品吗？',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                      _this.delDrug(record.ID);
                    }
                  });
                  console.log(record);
                }}
                style={{ marginRight: 8 }}
              >
                删除
              </a>
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
              history.push('/drug/detail?type=add');
            }}
          >
            新增药品
          </Button>
        </Card>
        <div className='content-wrap'>
          <Table
            rowKey='ID'
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
      type: '1'
    });
  }

  handleFilter = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSearch(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout='inline' onSubmit={this.handleFilter}>
        <FormItem label='搜索类型'>
          {getFieldDecorator('type')(
            <Select>
              <Option value='1'>药品准字号</Option>
              <Option value='2'>药品名称</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='关键字'>
          {getFieldDecorator('key', {
            rules: [{ required: true, message: '请输入关键字!' }]
          })(<Input type='text' />)}
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
