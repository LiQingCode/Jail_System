import React, { useEffect, useState } from 'react';
import { Col, Row, Typography, Layout, Segmented, Menu, Tabs, Button } from 'antd';
import { CustomerServiceFilled, AppstoreFilled, PlayCircleFilled, UserOutlined, HomeOutlined, RightOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import HistoryBack from '../module/HistoryBack';
import '../../index';
import VoiceTab from '../module/VoiceTab';
import LifeInfoTab from '../module/LifeInfoTab';

const { Title } = Typography;
const { Content } = Layout;
const { TabPane } = Tabs;

const RoomView = () => {
  const { roomId } = useParams();
  const [personData, setPersonData] = useState('');
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
  const slot = {left:<Title level={3}><HomeOutlined /> {personData.roomName}&nbsp;&nbsp;<UserOutlined /> {personData.personName}</Title>, right:<a href="#/mainMuddle">总体监控<RightOutlined /></a>};

  function callback(key) {
    console.log(key);
  }

  return (
    <Layout>
      <Content>
        <Row>
          <Col span={18} offset={3}>
            <Tabs defaultActiveKey="1" onChange={callback} centered tabBarExtraContent={slot}>
              <TabPane tab={<span><AppstoreFilled />生命体征信息</span>} key="1">
                <LifeInfoTab roomId={roomId} />
              </TabPane>
              <TabPane tab={<span><PlayCircleFilled />事件回溯</span>} key="2">
                <HistoryBack roomId={roomId} roomName={personData.roomName} />
              </TabPane>
              <TabPane tab={<span><CustomerServiceFilled />微小语音监听</span>} key="3">
                <VoiceTab />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Content>
    </Layout>)
};

export default RoomView;
