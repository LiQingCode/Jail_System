import React, { useContext } from 'react';
import { Col, Layout, Row, Typography} from 'antd';
import CardForDetail from '../module/CradForDetail';
import TableForAlarm from '../module/TableForAlarm';
import CardForBasicData from '../module/CardForBasicData';
import { MessageContext } from '../message_queue/MessageContext';
const { Content} = Layout;
const { Title } = Typography;

const MainMuddle = () => {
    const { abnormalMessages } = useContext(MessageContext);
    const lastAbnormalMessage = '';
    if (abnormalMessages.length !== 0) {
        lastAbnormalMessage = abnormalMessages[abnormalMessages.length - 1];
    }
    console.log(lastAbnormalMessage);

    return (
        <Layout className="layout">
            <Content>
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <Row justify="center">
                            <Col span={24}><Title level={3}>总体监控模块</Title></Col>
                        </Row>
                        <CardForBasicData lastAbnormalMessage={lastAbnormalMessage} />
                        <Row justify="center">
                            <Col span={24}><Title level={4}>房间概览</Title></Col>
                            <Col span={24}>
                                <CardForDetail lastAbnormalMessage={lastAbnormalMessage} />
                            </Col>
                            <Col span={24}><Title level={4}>告警信息</Title></Col>
                            <Col span={24}>
                                <TableForAlarm lastAbnormalMessage={lastAbnormalMessage} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </Content>
        </Layout>
    )
}

export default MainMuddle;