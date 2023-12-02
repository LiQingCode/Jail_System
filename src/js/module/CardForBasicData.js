import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic} from 'antd';
import { HomeOutlined, TeamOutlined} from '@ant-design/icons';
import { getBasicDatas } from '../router/client';

const CardForBasicData = (props) => {

    const [BasicData, setBasicData] = useState('');
    
    const fetchBasicData = () => {
        getBasicDatas()
            .then(res => res.json()
                .then(data => {
                    setBasicData(data);
                    console.log(BasicData);
                }))
    };

    useEffect(() => {
        fetchBasicData();
    }, [props]);

    return (
        <Row gutter={[16, 0]} justify="center">
            <Col span={8}>
                <Card bordered={false}>
                    <Statistic
                        title="房间总数"
                        value={BasicData.roomCount}
                        valueStyle={{ color: '#2376b7' }}
                        prefix={<HomeOutlined />}
                        suffix="间"
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false}>
                    <Statistic
                        title="目前人数"
                        value={BasicData.personCount}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<TeamOutlined />}
                        suffix="人"
                    />
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false}>
                    <Statistic
                        title="异常人数"
                        value={BasicData.abnormalPersonCount}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<TeamOutlined />}
                        suffix="人"
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default CardForBasicData;