import React from 'react';
import echartTheme from './echartTheme';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

export default props => {
  if (!props.option) {
    return '暂无数据';
  }

  // 注入主题
  echarts.registerTheme('kc', echartTheme);

  const defaultStyle = { height: 400 };
  const cssStyle = Object.assign(defaultStyle, props.cssStyle);

  return (
    <div>
      <ReactEcharts option={props.option} theme='kc' style={cssStyle} />
    </div>
  );
};
