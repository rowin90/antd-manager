import React, { Suspense } from 'react';
import { Card, Col, Row } from 'antd';
import { connect } from 'react-redux';
import Echart from 'components/Echart';
import { UPvOption, mapOption } from './components/echart-option';
import IntroduceRow from './components/IntroduceRow';
import Home_API from '@/api/home';
import Utils from '@/utils/utils';

import './index.less';

@connect(state => ({ redux_province_data: state.base.province }))
class Home extends React.Component {
  state = {
    saleData: {},
    upvData: {},
    mapData: {}
  };
  componentDidMount() {
    this.requestList();
  }

  async requestList() {
    let today = Utils.Time.normTimeToStrNoMS(Date.now());

    let result = await Promise.all([
      Home_API.getBaseData(),
      Home_API.getVisitData({ start_date: 0, end_date: today }),
      Home_API.getAreaData({ start_date: 0, end_date: today })
    ]);
    this.setState({
      saleData: result[0].data,
      upvData: result[1].data,
      mapData: result[2].data
    });
  }
  render() {
    let { saleData, upvData, mapData } = this.state;

    return (
      <div className='home-page'>
        <IntroduceRow data={saleData} />
        <div style={{ margin: '20px 0', padding: '10px 0' }}>
          <Echart option={UPvOption(upvData)} cssStyle={{ height: '500px' }} />
        </div>

        <div className='map'>
          <Echart
            option={mapOption(mapData, this.props.redux_province_data)}
            cssStyle={{ height: '600px' }}
          />
        </div>
      </div>
    );
  }
}

export default Home;
