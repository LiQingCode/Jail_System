import React, { useEffect, useRef, useState } from 'react';
import { Card, Typography } from 'antd';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChartOutlined } from '@ant-design/icons';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
const { Title } = Typography;
const LifeInfoChartOfBreath = (allProps) => {
    const chartBreathRef = useRef(null);
    const myChart = useRef(null);
    const [breathRate, setBreathRate] = useState(0);
    const [messageTime, setMessageTime] = useState('2014-01-13 00:00:00');
    const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [date, setDate] = useState(['00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00', '00:00:00']);
    const lastNormalMessage = allProps.lastNormalMessage;
    const [updateState, setUpdateState] = useState(0);
    
    function addData(shift, value, now) {
        var nowDisplay = now.slice(11, 19);
        setDate((prevDate) => [...prevDate, nowDisplay]);
        setData((prevData) => [...prevData, value]);
        if (shift) {
            setDate((prevDate) => prevDate.slice(1));
            setData((prevData) => prevData.slice(1));
        }
    }

    const updateData = () => {
        var value = breathRate;
        var now = messageTime;
        addData(true, value, now);
        myChart.current.setOption({
            xAxis: {
                data: date,
            },
            series: [
                {
                    name: 'breath',
                    data: data,
                },
            ],
        });
        setUpdateState(updateState+1);
    };

    useEffect(() => {
        if (allProps.chartType === 2 && lastNormalMessage.content.dataType === 2) {
            setBreathRate(lastNormalMessage.content.value);
            setMessageTime(lastNormalMessage.time);
        }
        myChart.current = echarts.init(chartBreathRef.current);
        var option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
            },
            yAxis: {
                boundaryGap: [0, '50%'],
                type: 'value',
            },
            series: [
                {
                    name: 'breath',
                    type: 'line',
                    smooth: false,
                    symbol: 'none',
                    data: data,
                },
            ],
        };
        myChart.current.setOption(option);
    }, [allProps, updateState]);

    useEffect(() => {
        updateData();
    }, [breathRate, messageTime]);

    return (
        <>
            <Title level={4}><LineChartOutlined /> 呼吸（次/分）</Title>
            <Card bordered={false}>
                <div ref={chartBreathRef} style={{ width: '100%', height: '300px' }} />
            </Card>
        </>
    )
}
export default LifeInfoChartOfBreath;