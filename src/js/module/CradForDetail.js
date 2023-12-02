import React, { useEffect, useState, useContext } from 'react';
import { Card, Col, Row, Space, Tag, Button, Statistic, Badge } from 'antd';
import { getAllRooms, getQueueRoomId } from '../router/client';
import { useHistory } from 'react-router-dom';
import Icon, { CheckCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined, EyeOutlined, LockOutlined} from '@ant-design/icons';
import { MessageContext } from '../message_queue/MessageContext';

// 自定义图标
const TidongSvg = () => (
    <svg t="1689580272222" className="icon" viewBox="0 0 1040 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3492" width="24" height="24"><path d="M1024 383.92832c0-79.174656-64.18432-143.36-143.36-143.36-79.174656 0-143.36 64.185344-143.36 143.36 0 76.802048 60.394496 139.495424 136.282112 143.184896-0.556032 7.822336-1.293312 17.467392-2.233344 28.387328l-186.561536 39.375872c-49.263616-37.056512-111.975424-56.546304-178.173952-50.223104-70.375424 6.721536-131.361792 41.330688-173.074432 91.851776-33.2032 40.214528-81.747968 67.765248-137.764864 73.114624-55.436288 5.295104-107.798528-12.155904-147.857408-44.701696-5.264384-4.844544-12.484608-7.520256-20.16768-6.787072-14.354432 1.371136-24.882176 14.119936-23.51104 28.47744 0.678912 7.104512 4.1472 13.267968 9.214976 17.518592l-0.043008 0.0512C63.91296 745.892864 130.347008 768.330752 200.71936 761.61024c70.371328-6.720512 131.359744-41.330688 173.070336-91.854848 33.2032-40.214528 81.747968-67.7632 137.766912-73.112576 55.706624-5.320704 108.30848 12.319744 148.441088 45.170688 4.723712 4.622336 11.1616 7.35232 17.997824 7.323648 0.016384 0 0.031744 0.001024 0.048128 0.001024 0.008192 0 0.016384 0 0.022528 0 0.871424 0.004096 1.750016-0.034816 2.635776-0.118784 1.666048-0.15872 3.277824-0.478208 4.82816-0.927744l180.289536-38.052864c-6.28736 53.66784-16.279552 114.87232-31.337472 149.257216-22.868992 52.225024-58.708992 52.56704-99.668992 19.116032-35.668992-29.129728-104.592384-124.891136-204.383232-133.121024-90.78272-7.487488-184.3712 114.840576-231.457792 180.82304l0.004096 0.003072c-3.028992 4.263936-4.816896 9.472-4.816896 15.100928 0 14.420992 11.691008 26.112 26.112 26.112 10.099712 0 18.853888-5.738496 23.197696-14.128128l0.017408 0.011264c15.442944-24.927232 103.581696-155.9808 180.722688-156.663808 67.566592-0.598016 137.903104 82.829312 178.176 123.846656 51.275776 52.224 132.811776 43.414528 169.643008-26.966016 35.308544-67.472384 46.436352-223.121408 49.156096-271.966208C980.615168 503.970816 1024 449.020928 1024 383.92832zM880.64 475.06432c-50.332672 0-91.136-40.803328-91.136-91.136s40.803328-91.136 91.136-91.136 91.136 40.803328 91.136 91.136S930.972672 475.06432 880.64 475.06432z" fill="#3f8600" p-id="3493"></path></svg>
);
const LungSvg = () => (
    <svg t="1689579249251" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2600" width="24" height="24"><path d="M938.709333 725.333333c-0.042667 170.666667-0.042667 170.666667-170.666666 170.666667-170.666667 0-213.333333-128-213.333334-256 0-16.128-0.768-39.168-1.109333-66.133333l86.314667 49.877333L640 640c0 118.442667 34.816 170.666667 128 170.666667 48.64 0 68.693333-0.298667 83.754667-1.621334 1.28-14.976 1.578667-35.072 1.578666-83.712 0-136.746667-29.994667-257.408-78.293333-337.066666-35.754667-58.965333-68.821333-78.634667-86.698667-72.661334-12.501333 4.181333-25.813333 27.733333-35.456 69.248l-76.373333-44.074666c15.744-51.072 41.898667-91.776 84.821333-106.112 128-42.666667 277.461333 170.666667 277.333334 490.666666zM362.666667 234.666667c42.965333 14.336 69.12 55.04 84.864 106.112L371.157333 384.853333c-9.642667-41.514667-22.997333-65.066667-35.456-69.248-17.92-5.973333-50.986667 13.653333-86.698666 72.618667C200.661333 467.925333 170.666667 588.586667 170.666667 725.333333c0 48.64 0.298667 68.693333 1.621333 83.712 14.976 1.322667 35.072 1.621333 83.712 1.621334 93.184 0 128-52.224 128-170.666667l0.170667-16.298667 86.314666-49.834666c-0.426667 27.008-1.152 50.005333-1.152 66.133333 0 128-42.666667 256-213.333333 256s-170.666667 0-170.666667-170.666667C85.333333 405.333333 234.666667 192 362.666667 234.666667zM554.666667 85.333333v316.672l200.362666 115.712-42.666666 73.898667L512 475.946667l-200.362667 115.669333-42.666666-73.898667L469.333333 402.005333V85.333333h85.333334z" p-id="2601" fill="#3f8600"></path></svg>
);
const HeartSvg = () => (
    <svg t="1690960559192" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2280" width="24" height="24"><path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" p-id="2281" fill="#3f8600"></path></svg>
);

const TidongIcon = (props) => <Icon component={TidongSvg} {...props} />;
const LungIcon = (props) => <Icon component={LungSvg} {...props} />;
const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;

const CardForDetail = (props) => {
    const [Data, setData] = useState([]);
    const [queueRoomId, setQueueRoomId] = useState('');
    const { normalMessages } = useContext(MessageContext);
    const [RealTimeData, setRealTimeData] = useState({});

    const heartType = 1;
    const breatheType = 2;
    const bodyMoveType = 3;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        refreshData();
    }, [props]);

    useEffect(() => {
        if (normalMessages.length !== 0) {
            fetchQueueRoomIdByDeviceId(normalMessages[normalMessages.length - 1].deviceID);
        }
    }, [normalMessages]);

    const fetchData = () => {
        getAllRooms()
            .then(res => res.json()
                .then(data => {
                    setData(data);
                    initializeAllRooms(data);
                }))
    };

    const refreshData = () =>{
        getAllRooms()
        .then(res => res.json()
            .then(data => {
                setData(data);
            }))
    };

    const initializeAllRooms = (roomDatas) => {
        const initRealTimeData = {};
        roomDatas.forEach(roomData => {
            initRealTimeData[roomData.roomId] = {
                1: -1,
                2: -1,
                3: -1,
            }
        });
        setRealTimeData(initRealTimeData);
    };

    const fetchQueueRoomIdByDeviceId = (props) => {
        getQueueRoomId({ deviceId: props })
            .then(response => response.text())
            .then(data => {
                // 处理后端返回的数据
                setQueueRoomId(data);
                const lastNormalMessage = normalMessages[normalMessages.length - 1];
                const dataType = lastNormalMessage.content.dataType;
                const dataValue = lastNormalMessage.content.value;
                setRealTimeData(preRealTimeData => ({
                    ...preRealTimeData,
                    [data]: {
                        ...preRealTimeData[data],
                        [dataType]: dataValue,
                    }
                }));
            })
            .catch(error => {
                // 处理请求错误
                console.error('请求出错:', error);
            })
    }

    const history = useHistory();

    const handleRoomClick = (roomId) => {
        // history.push(`/lifeInfo/${roomId}`);
        history.push(`/roomView/${roomId}`);
    };

    return (
        <Row>
            <Col span={24}>
                <Row gutter={[16, 0]}>
                    {Data.map((item, index) => (
                        <Col span={6} key={index}>
                            <Card
                                bordered={false}
                                key={index}
                                title={
                                    <Space size={0}>
                                        <strong style={{marginRight: 8}}>{item.roomName}</strong>
                                        {item.roomStatus ?
                                            <Tag icon={<CheckCircleOutlined />} color="success">有人</Tag> :
                                            <Tag icon={<MinusCircleOutlined />} color="default">无人</Tag>}
                                        {item.personStatus!==0 ?
                                            <Tag icon={<ExclamationCircleOutlined />} color="error">异常<Badge size="small" offset={[3, -4]} count={item.personStatus}></Badge></Tag> :
                                            ''}
                                    </Space>}
                                extra={<Button disabled={item.roomStatus ? false : true} key={item.roomId} type="primary" onClick={() => handleRoomClick(item.roomId)}>查看</Button>}>
                                <Space align="center" size={60}>
                                    <Statistic title="心率" value={RealTimeData[item.roomId][heartType]===-1?'--':RealTimeData[item.roomId][heartType]} valueStyle={{ color: '#3f8600',fontSize: '18px' }} prefix={<HeartIcon />} />
                                    <Statistic title="呼吸" value={RealTimeData[item.roomId][breatheType]===-1?'--':RealTimeData[item.roomId][breatheType]} valueStyle={{ color: '#3f8600', fontSize: '18px'}} prefix={<LungIcon />} />
                                    <Statistic title="体动" value={RealTimeData[item.roomId][bodyMoveType]===-1?'--':RealTimeData[item.roomId][bodyMoveType]===1?'活动':'安静'} valueStyle={{ color: '#3f8600', fontSize: '18px' }} prefix={<TidongIcon />} />
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}

export default CardForDetail;