import React, { useEffect, useState, useContext } from 'react';
import { Table, Row, Col, DatePicker, Button, Modal, Card, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import TimeLineForModal from './TimeLineForModal';
import ReactPlayer from 'react-player';
import { MessageContext } from '../message_queue/MessageContext';
import '../../index';
import { getQueueRoomId } from '../router/client';
dayjs.locale('zh-cn');
const { RangePicker } = DatePicker;
const ContainerHeight = 500;

const rangePresets = [
    {
        label: '过去 7 天',
        value: [dayjs().add(-7, 'd'), dayjs()],
    },
    {
        label: '过去 14 天',
        value: [dayjs().add(-14, 'd'), dayjs()],
    },
    {
        label: '过去 30 天',
        value: [dayjs().add(-30, 'd'), dayjs()],
    },
    {
        label: '过去 90 天',
        value: [dayjs().add(-90, 'd'), dayjs()],
    },
];

const HistoryBack = (props) => {
    const { roomId, roomName } = props;
    const [WarningData, setWarningData] = useState();
    const [loading, setLoading] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const { abnormalMessages } = useContext(MessageContext);
    const lastAbnormalMessage = abnormalMessages[abnormalMessages.length - 1];
    const [queueRoomId, setQueueRoomId] = useState('-1');
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 15,
        },
    });
    const dataToSend = {
        startTime: startTime,
        endTime: endTime,
        roomId: roomId,
    }
    const warning_columns = [
        {
            title: '序号',
            dataIndex: 'key',
            rowScope: 'row',
            render: (_, record, index) => `${index + 1}`,
            width: '2%',
            align: 'center',
        },
        {
            title: '告警级别',
            dataIndex: 'eventLevel',
            key: 'eventLevel',
            filters: [
                {
                    text: '一般报警',
                    value: '一般报警',
                },
                {
                    text: '重要报警',
                    value: '重要报警',
                },
                {
                    text: '紧急报警',
                    value: '紧急报警',
                },
            ],
            align: 'center',
            width: '4%',
            onFilter: (value, record) => record.eventLevel.indexOf(value) === 0,
        },
        {
            title: '告警类型',
            dataIndex: 'eventTypeName',
            key: 'eventTypeName',
            align: 'center',
            width: '4%',
        },
        {
            title: '告警详情',
            dataIndex: 'eventDetail',
            key: 'eventDetail',
            align: 'center',
            width: '7%',
        },
        {
            title: '告警时间',
            key: 'eventDisplayDate',
            dataIndex: 'eventDisplayDate',
            align: 'center',
            width: '5%',
        },
        {
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
                <Button type="primary" key={record} onClick={() => showModal(record.eventDisplayDate)}>
                    回看录像
                </Button>
            ),
            width: '3%',
            align: 'center',
        },
    ];

    const [open, setOpen] = useState(false);
    const showModal = (props) => {
        setOpen(true);
        setCurrentTime(props);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            setStartTime(dateStrings[0]);
            setEndTime(dateStrings[1]);
        } else {
            console.log('Clear');
            setStartTime('');
            setEndTime('');
        }
    };

    const fetchDataByTime = (props) => {
        fetch(global.BaseURL.url + `/VideoHistory/${roomId}/searchByTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        })
            .then(response => response.json())
            .then(data => {
                // 处理后端返回的数据
                console.log('后端返回的数据:', data);
                setWarningData(data);
            })
            .catch(error => {
                // 处理请求错误
                console.error('请求出错:', error);
            });
    }

    const fetchData = () => {
        setLoading(true);
        fetch(global.BaseURL.url + `/LifeInfo/${roomId}/AbnormalInfo`)
            .then((res) => res.json())
            .then((results) => {
                setWarningData(results);
                console.log(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: (results).length,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    // useEffect(() => {
    //     fetchData();
    // }, [JSON.stringify(tableParams)]);

    useEffect(() => {
        if (abnormalMessages.length !== 0) {
            fetchQueueRoomIdByDeviceId(lastAbnormalMessage.deviceID);
            if (Object.is(queueRoomId, roomId)) {
                fetchData();
            }
        }
        if (Object.is(queueRoomId, '-1')) {
            fetchData();
        }
    }, [abnormalMessages]);

    const fetchQueueRoomIdByDeviceId = (props) => {
        getQueueRoomId({ deviceId: props })
            .then(response => response.text())
            .then(data => {
                setQueueRoomId(data);
            })
            .catch(error => {
                console.error('请求出错:', error);
            })
    }

    const handleTableChange = (pagination) => {
        setTableParams({
            pagination,
        });
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setWarningData([]);
        }
    };

    return (
        <Row gutter={[16, 16]} justify="center">
            <Modal
                title="回看录像"
                visible={open}
                onOk={hideModal}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
                footer={[<Button onClick={hideModal}>关闭</Button>]}
                width={window.innerWidth / 1.5}
            >
                <Row gutter={[16, 0]}>
                    <Col span={16}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <ReactPlayer
                                url="/video/v1.mp4" // 替换为您的视频链接
                                width="100%" // 设置视频宽度
                                height="auto" // 设置视频高度
                                controls // 显示播放控制条
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <TimeLineForModal roomId={roomId} roomName={roomName} currentTime={currentTime} />
                    </Col>
                </Row>
            </Modal>
            <Col span={24}>
                <Card bordered={false}>
                    <Space style={{marginBottom: 15}}>
                        <RangePicker
                            presets={rangePresets}
                            showTime
                            format="YYYY/MM/DD HH:mm:ss"
                            onChange={onRangeChange}
                        />
                        <Button type="primary" icon={<SearchOutlined />} onClick={() => fetchDataByTime(dataToSend)}>
                            查找
                        </Button>
                    </Space>
                    <Table
                        columns={warning_columns}
                        rowKey={(record) => record.id}
                        dataSource={WarningData}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                        scroll={{ y: ContainerHeight, }}
                    />
                </Card>
            </Col>
        </Row>
    )
}
export default HistoryBack;