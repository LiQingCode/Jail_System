import React, { useEffect, useState } from 'react';
import { Timeline, Row, Col, Button, Typography, Space, Tag, Divider } from 'antd';

const { Title } = Typography;
const TimeLineForModal = (props) => {
    const [activeNode, setActiveNode] = useState(null);
    const [eventData, setEventData] = useState([]);
    const { roomId, roomName, currentTime } = props;
    const dataToSend = {
        currentTime: currentTime.slice(0, 10),
        roomId: roomId,
    }
    useEffect(() => {
        fetchDataByTime(dataToSend);
    }, [currentTime]);

    const fetchDataByTime = (props) => {
        fetch(global.BaseURL.url + `/VideoHistory/${roomId}/timeLineSearchByCurrentTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        })
            .then(response => response.json())
            .then(data => {
                console.log('后端返回的数据:', data);
                setEventData(data);
                const currentNode = data.findIndex(currentNode => currentNode.eventDisplayDate === currentTime);
                setActiveNode(currentNode);
            })
            .catch(error => {
                console.error('请求出错:', error);
            });
    }

    // 处理节点点击事件的函数
    const handleNodeClick = (node) => {
        setActiveNode(node);
        // 在此处执行其他任何附加操作，以响应节点点击
    };

    return (
        <Row>
            <Col span={24}>
                <Title level={4}>{roomName}房间 <Tag color="blue">{currentTime.slice(0, 10)}</Tag></Title>
            </Col>
            <Divider>事件</Divider>
            <Col span={24} style={{}}>
                <Space direction="vertical" size="middle" style={{ display: 'flex', height: '350px', overflow: 'auto' }}>
                    <style>
                        {`
                            /* 隐藏滚动条边框 */
                            ::-webkit-scrollbar {
                            width: 8px;
                            }

                            ::-webkit-scrollbar-thumb {
                                background-color: #eee;
                            }

                            ::-webkit-scrollbar-thumb:hover {
                                background-color: #FFF;
                            }
                        `}
                    </style>
                    <Timeline>
                        {eventData.map((node, index) => (
                            <Timeline.Item
                                key={index}
                                color={activeNode === index ? 'green' : undefined}
                            >
                                <Row style={{ textAlign: 'center' }} key={index}>
                                    <Col span={18}>
                                        <Button size="small" type="text" onClick={() => handleNodeClick(index)}><strong>{node.eventDetail}</strong></Button>
                                    </Col>
                                    <Col span={6}>
                                        <strong><Tag color="blue">{node.eventDisplayDate.slice(11, 19)}</Tag></strong>
                                    </Col>
                                </Row>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Space>
            </Col>
        </Row>
    );
};

export default TimeLineForModal;