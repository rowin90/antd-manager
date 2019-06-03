import React from 'react';
// import echarts from 'echarts';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼图和折线图
import 'echarts/lib/chart/pie';
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
  console.log(data);

  let option = {
    title: {
      text: '职业分布',
      x: 'center'
    },
    legend: {
      orient: 'horizontal',
      top: 380,
      data: Object.keys(data)
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a}<br/>{b}:{c}({d}%)'
    },
    series: [
      {
        name: '人数',
        type: 'pie',
        itemStyle: {
          color: function(d) {
            return (
              '#' +
              Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
            );
          }
        },
        data: Utils.Echart.normData(data)
      }
    ]
  };
  return option;
}
