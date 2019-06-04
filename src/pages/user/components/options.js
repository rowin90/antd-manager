import Utils from '@/utils/utils';

export const sexOption = data => {
  if (!data) return null;
  let option = {
    title: {
      text: '性别比例',
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
        radius: ['50%', '80%'],
        data: Utils.Echart.normData(data)
      }
    ]
  };
  return option;
};

export const ageOption = data => {
  if (!data) return null;

  let option = {
    title: {
      text: '年龄分布',
      x: 'center'
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

export const educationOption = data => {
  if (!data) return null;

  var option = {
    title: {
      text: '学历分布',
      x: 'center'
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
};

export const professionOption = data => {
  if (!data) return null;

  let option = {
    title: {
      text: '职业分布',
      x: 'center'
    },
    legend: {
      orient: 'vertical',
      right: '0',
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
        data: Utils.Echart.normData(data)
      }
    ]
  };
  return option;
};
