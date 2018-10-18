import React from 'react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';
// import echarts from 'echarts';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱形图
import 'echarts/lib/chart/bar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

import ReactEcharts from 'echarts-for-react';

export default class Bar extends React.Component{

    componentWillMount(){
        // 注入主题
        echarts.registerTheme('raoju',echartTheme)
    }

    getOption = () =>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            // 展示x轴数据
            tooltip:{
                trigger:'axis'
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'订单量',
                    type:'bar',
                    data:[1000,2000,1500,3000,2000,1200,800]
                }
            ]
        }
        return option;
    }

    getOption2 = () =>{
        let option = {
            title:{
                text:'用户骑行订单'
            },
            // 展示x轴数据
            tooltip:{
                trigger:'axis'
            },
            // 副标题
            legend:{
                data:['ofo','摩拜','小懒']
            },
            xAxis:{
                data:['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis:{
                type:'value'
            },
            series:[
                {
                    name:'ofo',
                    type:'bar',
                    data:[2000,3000,5500,7000,8000,12000,20000]
                },
                {
                    name:'摩拜',
                    type:'bar',
                    data:[1200,3000,4500,6000,8000,1000,1000]
                },
                {
                    name:'小懒',
                    type:'bar',
                    data:[1000,2000,2500,4000,6000,7000,8000]
                },
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
                <Card title="柱形图表2" style={{marginTop:'10px'}}>
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