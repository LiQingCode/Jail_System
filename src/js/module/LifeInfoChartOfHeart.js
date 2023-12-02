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
const LifeInfoChartOfHeart = (allProps) => {
    const chartRef = useRef();
    const myChart = useRef(null);
    const [heartRate, setHeartRate] = useState(0);
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
        var value = heartRate;
        var now = messageTime;
        addData(true, value, now);
        myChart.current.setOption({
            xAxis: {
                data: date,
            },
            series: [
                {
                    name: 'heart',
                    data: data,
                },
            ],
        });
        setUpdateState(updateState+1);
    };

    useEffect(() => {
        if (allProps.chartType === 1 && lastNormalMessage.content.dataType === 1) {
            setHeartRate(lastNormalMessage.content.value);
            setMessageTime(lastNormalMessage.time);
        }
        myChart.current = echarts.init(chartRef.current);
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
                    name: 'heart',
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
    }, [heartRate, messageTime]);

    return (
        <>
            <Title level={4}><LineChartOutlined /> 心率（次/分）</Title>
            <Card bordered={false}>
                <div ref={chartRef} style={{ width: '100%', height: '300px' }} />
            </Card>
        </>
    )
}
export default LifeInfoChartOfHeart;