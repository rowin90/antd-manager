import React from 'react';
import Utils from '@/utils/utils';
import { Card, Form, DatePicker, Radio, Row, Col } from 'antd';
import User_API from '@/api/user';
import Echart from 'components/Echart';

import {
  sexOption,
  ageOption,
  educationOption,
  professionOption
} from './components/options';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

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
    // start_date: Utils.Time.normTimeToStrNoMS(transformTimeScale('7')),
    start_date: '0',
    end_date: Utils.Time.normTimeToStrNoMS(Date.now())
  };

  async requestList() {
    let result = await User_API.analyze(this.params);
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
                <Echart option={sexOption(sex)} />
              </Col>
              <Col span={12}>
                <Echart option={professionOption(profession)} />
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: '40px' }}>
            <Row>
              <Col span={12}>
                <Echart option={ageOption(age)} />
              </Col>
              <Col span={12}>
                <Echart option={educationOption(grade)} />
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
      Utils.Time.normTimeToStrNoMS(time)
    );
    this.submitDate(start_date, end_date);
  };

  // 快速选择日期
  quickDate = e => {
    let start_date = transformTimeScale(Number(e.target.value));
    let end_date = Date.now();
    start_date = Utils.Time.normTimeToStrNoMS(start_date);
    end_date = Utils.Time.normTimeToStrNoMS(end_date);

    // 清除自定义日期
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
