import Utils from '@/utils/utils';
import '@/config/echarts_data/china';

// 限制只取最近 30 条
const LIMIT = 30;

export const UPvOption = data => {
  let option = {
    title: {
      text: 'PV , UV 数据',
      x: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['PV', 'UV'],
      right: 30,
      top: 10
    },
    xAxis: {
      data: Object.keys(data).slice(-LIMIT)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'PV',
        type: 'line',
        stack: '总量',
        data: normUpvData(data, 'pv')
      },
      {
        name: 'UV',
        type: 'line',
        stack: '总量',
        data: normUpvData(data, 'uv')
      }
    ]
  };
  return option;
};

/**
 * 解析 uv pv 数据
 * @param {Object} data 数据
 * @param {String} type 类型 pv uv
 */
function normUpvData(data, type) {
  return Object.values(data)
    .slice(-LIMIT)
    .map(item => item[type]);
}

export const mapOption = (data, province) => {
  let myData = normMapData(data, province);

  let optionMap = {
    backgroundColor: '#FFFFFF',
    title: {
      text: '全国用户大数据',
      subtext: 'PV,UV数据',
      x: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'item',
      formatter: params => {
        let data = params.data;
        if (!data) {
          return '';
        }
        return `${data.name}<br/>pv:${data.pv}<br/>uv:${data.uv}`;
      }
    },

    hoverLink: true,
    //左侧小导航图标
    // visualMap: {
    //   show: true,
    //   x: 'left',
    //   y: 'center',
    //   dimension: 2,
    //   splitList: [
    //     { start: 500, end: 600 },
    //     { start: 400, end: 500 },
    //     { start: 300, end: 400 },
    //     { start: 200, end: 300 },
    //     { start: 100, end: 200 },
    //     { start: 0, end: 100 }
    //   ],
    //   color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
    // },

    //配置属性
    series: [
      {
        name: '数据',
        type: 'map',
        mapType: 'china',
        roam: true,
        label: {
          normal: {
            show: true //省份名称
          },
          emphasis: {
            show: false
          }
        },
        roam: false,
        data: myData //数据
      }
    ]
  };

  return optionMap;
};

function randomData() {
  return Math.round(Math.random() * 500);
}

function normMapData(data, province) {
  let target = [];
  let item = {};

  // 映射省份
  for (let [key, value] of Object.entries(data)) {
    target.push(
      Object.assign(value, {
        name: province[key]
      })
    );
  }

  // 处理数据显示
  target.forEach(item =>
    Object.assign(item, {
      itemStyle: {
        color: (function() {
          return (
            '#' + Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
          );
        })()
      }
    })
  );

  return target;
}
