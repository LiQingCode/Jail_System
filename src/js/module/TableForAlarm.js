import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Drawer, Button } from 'antd';
import { getAlarmEvents } from '../router/client';
import { PicRightOutlined } from '@ant-design/icons';

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        rowScope: 'row',
        render: (_, record, index) => `${index + 1}`,
    },
    {
        title: '所在房间',
        dataIndex: 'eventRoom',
        key: 'eventRoom',
        render: (text) => <a>{text}</a>,
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
        onFilter: (value, record) => record.eventLevel.indexOf(value) === 0,
    },
    {
        title: '告警类型',
        dataIndex: 'eventTypeName',
        key: 'eventTypeName',
        align: 'center',
    },
    {
        title: '告警详情',
        dataIndex: 'eventDetail',
        key: 'eventDetail',
        align: 'center',
    },
    {
        title: '告警时间',
        key: 'eventDisplayDate',
        dataIndex: 'eventDisplayDate',
        align: 'center',
    },
];

const TableForAlarm = (props) => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [AlarmsData, setAlarmsData] = useState([]);

    const showDrawer = () => {
        setSize(800);
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchData();
    }, [props]);

    const fetchData = () => {
        try {
            getAlarmEvents().then((res) => res.json()).then((data) => {
                setAlarmsData(data);
                console.log(data);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Row>
            <Col span={24}>
                <Card bordered={false}>
                    <Table columns={columns} dataSource={AlarmsData.slice(0, 5)} pagination={false} rowKey={(record) => record.id}
                        summary={() => (
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={6} align='center'><Button type="primary" onClick={showDrawer}>查看更多<PicRightOutlined /></Button></Table.Summary.Cell>
                            </Table.Summary.Row>
                        )} />
                    <Drawer title="告警信息" placement="right" onClose={onClose} visible={open} width={size}>
                        <Table columns={columns} dataSource={AlarmsData} pagination={false} rowKey={(record) => record.id} />
                    </Drawer>
                </Card>
            </Col>
        </Row>
    )
}
export default TableForAlarm;