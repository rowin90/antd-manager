import React from 'react';
import Utils from '@/utils/utils';
import {
  Card,
  Button,
  Table,
  Form,
  Select,
  Modal,
  message,
  Input,
  DatePicker,
  Radio,
  Row,
  Col
} from 'antd';
import moment from 'moment';
import User_API from '@/api/user';

import EchartGender from './components/echart-gender';
import EchartAge from './components/echart-age';
import EchartEducation from './components/echart-education';
import EchartProfession from './components/echart-profession';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const { MonthPicker, RangePicker } = DatePicker;

// 转化距离今天的时间戳
function transformTimeScale(scale) {
  return Date.now() - scale * 24 * 60 * 60 * 1000;
}

class UserAnalyze extends React.Component {
  state = {
    age: {},
    grade: {},
    profession: {},
    sex: {}
  };
  componentDidMount() {
    this.requestList();
  }

  params = {
    // start_date: Utils.Form.normTimeToStrNoMS(transformTimeScale('7')),
    start_date: '0',
    end_date: Utils.Form.normTimeToStrNoMS(Date.now())
  };

  async requestList() {
    let result = await User_API.analyze(this.params);
    console.log(result);
    let { age, grade, profession, sex } = result.data;
    this.setState({ age, grade, profession, sex });
  }

  changeDate = (start_date, end_date) => {
    this.params = {
      start_date,
      end_date
    };

    this.requestList();
  };

  render() {
    let { age, grade, profession, sex } = this.state;
    return (
      <div>
        <Card title='用户画像'>
          <FilterForm changeDate={this.changeDate} />
          <div style={{ marginTop: '40px' }}>
            <Row>
              <Col span={12}>
                <EchartGender data={sex} />
              </Col>
              <Col span={12}>
                <EchartProfession data={profession} />
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: '40px' }}>
            <Row>
              <Col span={12}>
                <EchartAge data={age} />
              </Col>
              <Col span={12}>
                <EchartEducation data={grade} />
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

class FilterForm extends React.Component {
  // 自定义选择日期
  onChange = (value, dateString) => {
    let [start_date, end_date] = value.map(time =>
      Utils.Form.normTimeToStrNoMS(time)
    );
    this.submitDate(start_date, end_date);
  };

  // 快速选择日期
  quickDate = e => {
    let start_date = transformTimeScale(Number(e.target.value));
    let end_date = Date.now();
    start_date = Utils.Form.normTimeToStrNoMS(start_date);
    end_date = Utils.Form.normTimeToStrNoMS(end_date);

    // 清除自定义日期
    // document.querySelectorAll('.ant-calendar-range-picker-input').value = '';
    Array.from(
      document.querySelectorAll('.ant-calendar-range-picker-input')
    ).forEach(item => (item.value = ''));

    this.submitDate(start_date, end_date);
  };

  // 提交时间
  submitDate(start, end) {
    this.props.changeDate(start, end);
  }

  render() {
    return (
      <Form layout='inline'>
        <FormItem label='选择时间'>
          <Radio.Group defaultValue='7' onChange={this.quickDate}>
            <Radio.Button value='7'>7天</Radio.Button>
            <Radio.Button value='14'>14天</Radio.Button>
            <Radio.Button value='30'>30天</Radio.Button>
          </Radio.Group>
        </FormItem>
        <FormItem label='时间范围'>
          <RangePicker
            format='YYYY-MM-DD'
            onChange={this.onChange}
            onOk={this.onOk}
          />
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);

export default UserAnalyze;
