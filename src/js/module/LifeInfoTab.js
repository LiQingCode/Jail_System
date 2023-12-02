import React, { useEffect, useState, useContext } from 'react';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import '../../index';
import LifeInfoBasicData from '../module/LifeInfoBasicData'
import LifeInfoVideoMuddle from '../module/LifeInfoVideoMuddle';
import LifeInfoChartOfHeart from '../module/LifeInfoChartOfHeart';
import LifeInfoChartOfBreath from '../module/LifeInfoChartOfBreath';
import { MessageContext } from '../message_queue/MessageContext';
import { getQueueRoomId } from '../router/client';

const LifeInfo = () => {
  const { roomId } = useParams();
  const [queueRoomId, setQueueRoomId] = useState('');
  const [chartType, setChartType] = useState(0);
  const { normalMessages } = useContext(MessageContext);
  const lastNormalMessage = normalMessages[normalMessages.length - 1];

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

  return (
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
    </Row>)
};

export default LifeInfo;