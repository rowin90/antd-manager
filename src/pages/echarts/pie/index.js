import React from 'react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';
// import echarts from 'echarts';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入饼图和折线图
import 'echarts/lib/chart/pie'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

import ReactEcharts from 'echarts-for-react';

export default class Pie extends React.Component{

    componentWillMount(){
        // 注入主题
        echarts.registerTheme('raoju',echartTheme)
    }

    getOption = () =>{
        let option = {
           title:{
               text:'用户骑行订单',
               x:'center'
           },
           legend:{
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data:['周一','周二','周三','周四','周五','周六','周日']
           },
           tooltip:{
               trigger:'item',
               formatter:'{a}<br/>{b}:{c}({d}%)'
           },
           series:[
               {
                   name:'订单量',
                   type:'pie',
                   data:[
                       {
                           value:1000,
                           name:'周一'
                       },
                       {
                           value:2000,
                           name:'周二'
                       },
                       {
                           value:1500,
                           name:'周三'
                       },
                       {
                           value:6000,
                           name:'周四'
                       },
                       {
                           value:7000,
                           name:'周五'
                       },
                       {
                           value:10000,
                           name:'周六'
                       },
                       {
                           value:4000,
                           name:'周天'
                       }
                   ]
               }
           ]
        }
        return option;
    }

    getOption2 = () =>{
        let option = {
            title:{
                text:'用户骑行订单',
                x:'center'
            },
            legend:{
                 orient:'vertical',
                 right:10,
                 top:20,
                 bottom:20,
                 data:['周一','周二','周三','周四','周五','周六','周日']
            },
            tooltip:{
                trigger:'item',
                formatter:'{a}<br/>{b}:{c}({d}%)'
            },
            series:[
                {
                    name:'订单量',
                    type:'pie',
                    radius:['50%','80%'],
                    data:[
                        {
                            value:1000,
                            name:'周一'
                        },
                        {
                            value:2000,
                            name:'周二'
                        },
                        {
                            value:1500,
                            name:'周三'
                        },
                        {
                            value:6000,
                            name:'周四'
                        },
                        {
                            value:7000,
                            name:'周五'
                        },
                        {
                            value:10000,
                            name:'周六'
                        },
                        {
                            value:4000,
                            name:'周天'
                        }
                    ]
                }
            ]
        }
        return option;
    }
    render(){
        return (
            <div>
                <Card title="柱形图表1">
                    <ReactEcharts 
                        option={this.getOption()} 
                        theme="raoju"
                        style={{height:500}}
                    />
                </Card>
                <Card title="柱形图表2">
                <ReactEcharts 
                    option={this.getOption2()} 
                    theme="raoju"
                    style={{height:500}}
                />
                </Card>
            </div>
        )
    }
}