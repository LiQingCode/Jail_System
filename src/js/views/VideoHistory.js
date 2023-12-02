import React, { useEffect, useState } from 'react';
import { Col, Row, Menu, Typography, Layout, Space, Divider } from 'antd';
import { CustomerServiceFilled, AppstoreFilled, RollbackOutlined, PlayCircleFilled, UserOutlined, HomeOutlined, RightOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import HistoryBack from '../module/HistoryBack';
import '../../index';
const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const VideoHistory = () => {
    const { roomId } = useParams();
    const [personData, setPersonData] = useState('');

    const history = useHistory();
    const items =
        [{
            label: '生命体征信息',
            key: 'lifeInfo',
            icon: <AppstoreFilled />,
        },
        {
            label: '事件回溯',
            key: 'videoHistory',
            icon: <PlayCircleFilled />,
        },
        {
            label: '微小语音监听',
            key: 'voiceMonitor',
            icon: <CustomerServiceFilled />,
        },
        ];

    useEffect(() => {
        fetchPersonData();
    }, [roomId])

    const fetchPersonData = () => {
        fetch(global.BaseURL.url + `/LifeInfo/${roomId}`)
            .then((res) => res.json())
            .then((data) => {
                setPersonData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching person data:', error);
            });
    };

    const onClick = (e) => {
        console.log('click ', e);
        history.push(`/${e.key}/${roomId}`);
    };

    return (
        <Layout>
            <Header>
                <Row justify="center">
                    <Col span={18}>
                        <Space className='layout-sapce'>
                            <Title level={3}><HomeOutlined />{personData.roomName}房间 <UserOutlined />{personData.personName}</Title>
                            <Divider type="vertical" />
                            <Menu onClick={onClick} selectedKeys={['videoHistory']} mode="horizontal" items={items} />
                            <Divider type="vertical" />
                            <a href="#/mainMuddle" className='space-a'>返回<RightOutlined /></a>
                        </Space>
                    </Col>
                </Row>
            </Header>
            <Content>
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <HistoryBack roomId={roomId} roomName={personData.roomName} />
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </Content>
        </Layout>)
};

export default VideoHistory;
