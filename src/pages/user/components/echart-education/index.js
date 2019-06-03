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
import Utils from '@/utils/utils';

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

function getOption(data) {
  var option = {
    title: {
      text: '学历分布'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: Object.keys(data)
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: Object.keys(data)
    },
    series: [
      {
        name: '人数',
        type: 'bar',
        itemStyle: {
          // 随机显示
          //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

          // 定制显示（按顺序）
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
            ];
            return colorList[params.dataIndex];
          }
        },
        data: Utils.Echart.normData(data)
      }
    ]
  };
  return option;
}
