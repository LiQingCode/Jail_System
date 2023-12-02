import React, { useEffect, useState, useContext } from 'react';
import { Col, Row, Menu, Typography, Space, Button, Layout, Divider, Segmented } from 'antd';
import { CustomerServiceFilled, AppstoreFilled, RightOutlined, PlayCircleFilled, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import LifeInfoBasicData from '../module/LifeInfoBasicData'
import LifeInfoVideoMuddle from '../module/LifeInfoVideoMuddle';
import LifeInfoChartOfHeart from '../module/LifeInfoChartOfHeart';
import LifeInfoChartOfBreath from '../module/LifeInfoChartOfBreath';
import { MessageContext } from '../message_queue/MessageContext';
import { getQueueRoomId } from '../router/client';
import '../../index';
const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const LifeInfo = () => {
  const { roomId } = useParams();
  const [personData, setPersonData] = useState('');
  const [queueRoomId, setQueueRoomId] = useState('');
  const [chartType, setChartType] = useState(0);
  const history = useHistory();
  const { normalMessages } = useContext(MessageContext);
  const lastNormalMessage = normalMessages[normalMessages.length - 1];
  const items =
    [
      {
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

  useEffect(() => {
    if (normalMessages.length !== 0) {
      fetchQueueRoomIdByDeviceId(lastNormalMessage.deviceID);
      setChartType(lastNormalMessage.content.dataType);
    }
  }, [normalMessages]);

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

  const fetchPersonData = () => {
    fetch(global.BaseURL.url + `/LifeInfo/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        setPersonData(data);
      })
      .catch((error) => {
        console.error('Error fetching person data:', error);
      });
  };

  const onClick = (e) => {
    console.log('click ', e);
    history.push(`/${e.key}/${roomId}`);
  };

  const onChange = (val) => {
    history.push(`/${val}/${roomId}`);
  };

  return (
    <Layout className="layout">
      {/* <Header>
        <Row justify="center">
          <Col span={18}>
            <Space className='layout-sapce'>
              <Title level={3}><HomeOutlined /> {personData.roomName}&nbsp;&nbsp;<UserOutlined /> {personData.personName}</Title>
              <Divider type="vertical" />
              <Menu onClick={onClick} selectedKeys={['lifeInfo']} mode="horizontal" items={items} />
              <Divider type="vertical" />
              <a href="#/mainMuddle" className='space-a'>返回<RightOutlined /></a>
            </Space>
          </Col>
        </Row>
      </Header> */}
      <Content>
        <Row>
          <Col span={3}></Col>
          <Col span={18}>
            <div>
              <div style={{ float: 'right' }}>
                {/* <Segmented options={[
                  {
                    label: '生命体征信息',
                    value: 'lifeInfo',
                    icon: <AppstoreFilled />,
                  },
                  {
                    label: '事件回溯',
                    value: 'videoHistory',
                    icon: <PlayCircleFilled />,
                  },
                  {
                    label: '微小语音监听',
                    value: 'voiceMonitor',
                    icon: <CustomerServiceFilled />,
                  },
                ]} onChange={onChange} /> */}
                <Menu onClick={onClick} selectedKeys={['lifeInfo']} mode="horizontal">
                  <Menu.Item key="lifeInfo" icon={<AppstoreFilled />}>
                    生命体征信息
                  </Menu.Item>
                  <Menu.Item key="videoHistory" icon={<PlayCircleFilled />}>
                    事件回溯
                  </Menu.Item>
                  <Menu.Item key="voiceMonitor" icon={<CustomerServiceFilled />}>
                    微小语音监听
                  </Menu.Item>
                </Menu>
                <a href="#/mainMuddle">总体监控<RightOutlined /></a>
              </div>
              <Title level={3}><HomeOutlined /> {personData.roomName}&nbsp;&nbsp;<UserOutlined /> {personData.personName}</Title>
            </div>

            <Row gutter={[16, 0]} justify="space-between">
              <Col span={12}>
                <LifeInfoBasicData roomId={roomId} queueRoomId={queueRoomId} lastNormalMessage={lastNormalMessage} />
              </Col>
              <Col span={12}>
                <LifeInfoVideoMuddle roomId={roomId} />
              </Col>
              <Col span={12}>
                <LifeInfoChartOfHeart roomId={roomId} queueRoomId={queueRoomId} lastNormalMessage={lastNormalMessage} chartType={chartType} />
              </Col>
              <Col span={12}>
                <LifeInfoChartOfBreath roomId={roomId} queueRoomId={queueRoomId} lastNormalMessage={lastNormalMessage} chartType={chartType} />
              </Col>
            </Row>
          </Col>
          <Col span={3}></Col>
        </Row>
      </Content>
    </Layout>)
};

export default LifeInfo;
