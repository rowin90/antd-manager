import React from 'react';
import { Card } from 'antd';
//import echartTheme from './../echartTheme';
// import echarts from 'echarts';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱形图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

import ReactEcharts from 'echarts-for-react';

export default props => {
  if (!props.data) {
    return '暂无数据';
  }

  return (
    <div>
      <ReactEcharts
        option={getOption(props.data)}
        theme='raoju'
        style={{ height: 400 }}
      />
    </div>
  );
};

const getOption = data => {
  let option = {
    title: {
      text: '年龄分布'
    },
    // 展示x轴数据
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: Object.keys(data)
    },
    yAxis: {
      show: true
    },
    series: [
      {
        name: '人数',
        type: 'bar',
        itemStyle: {
          color: function(params) {
            var colorList = [
              '#C33531',
              '#EFE42A',
              '#64BD3D',
              '#EE9201',
              '#29AAE3',
              '#B74AE5',
              '#0AAF9F',
              '#E89589',
              '#16A085',
              '#4A235A',
              '#C39BD3 ',
              '#F9E79F',
              '#BA4A00',
              '#ECF0F1',
              '#616A6B',
              '#EAF2F8',
              '#4A235A',
              '#3498DB'
            ].reverse();
            return colorList[params.dataIndex];
          }
        },
        data: Object.values(data)
      }
    ]
  };
  return option;
};
