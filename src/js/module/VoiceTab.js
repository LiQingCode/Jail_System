import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, DatePicker, Button, Space, Card, List, Tag, Typography } from 'antd';
import { CustomerServiceFilled, AppstoreFilled, PlayCircleFilled, SearchOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import ReactPlayer from 'react-player';
import { SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import '../../index';
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;
const ContainerHeight = 280;
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

const VoiceTab = () => {
  const { roomId } = useParams();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [voiceText, setVoiceText] = useState('');
  const [reFresh, setReFresh] = useState(true);
  const dataToSend = {
    startTime: startTime,
    endTime: endTime,
    roomId: roomId,
  }
  const timerRef = useRef(null);

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
    if (Object.is(props.startTime, '') && Object.is(props.endTime, '')) {
      timerRef.current = setInterval(fetchRealTimeData, 5000);
      setReFresh(true);
    }
    else {
      clearInterval(timerRef.current);
      setReFresh(false);
    }
    fetch(global.BaseURL.url + `/VoiceMonitor/${roomId}/searchByTime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    })
      .then(response => response.json())
      .then(data => {
        setVoiceText(data);
      })
      .catch(error => {
        console.error('请求出错:', error);
      });
  }

  const fetchRealTimeData = () => {
    fetch(global.BaseURL.url + `/VoiceMonitor/${roomId}/realTimeData`)
      .then(response => response.json())
      .then(data => {
        setVoiceText(data);
        console.log(reFresh);
      })
      .catch(error => {
        console.error('请求出错:', error);
      });
  }

  useEffect(() => {
    console.log(reFresh);
    if (reFresh) {
      fetchRealTimeData();
      timerRef.current = setInterval(fetchRealTimeData, 5000);
      setReFresh(true);
    } else {
      clearInterval(timerRef.current);
      setReFresh(false);
    }

    return () => {
      clearInterval(timerRef.current);
      setReFresh(false);
    };

  }, [reFresh])

  return (
    <Card>
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
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ReactPlayer
              url="/video/v1.mp4" // 替换为您的视频链接
              width="100%" // 设置视频宽度
              height="auto" // 设置视频高度
              controls // 显示播放控制条
            />
          </div>
        </Col>
        <Col span={10}>
          <List
            dataSource={voiceText}
            pagination={{
              position: 'bottom',
              align: 'end',
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 6,
            }}
            size='small'
            renderItem={(item, render, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  title={item.audioText ? item.audioText : '--'}
                  description={
                    <Space>
                      <Text type="secondary">{item.displayTime}</Text>
                    </Space>
                  }
                />
                <div>
                  {item.alarmCodeName ? <Tag icon={<CloseCircleOutlined />} color="error">{item.alarmCodeName}</Tag> : ''}
                  {item.audioText ? '' : <Tag icon={<SyncOutlined spin />} color="warning">无法识别</Tag>}
                </div>
              </List.Item>
            )}
          />
      </Col>
      </Row>
    </Card>
  )

  return (
    <Row gutter={[16, 16]}>
      <Col span={12} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <RangePicker
          presets={rangePresets}
          showTime
          format="YYYY/MM/DD HH:mm:ss"
          onChange={onRangeChange}
        />
      </Col>
      <Col span={12}>
        <Button type="primary" icon={<SearchOutlined />} onClick={() => fetchDataByTime(dataToSend)}>
          查找
        </Button>
      </Col>
      <Col span={14}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactPlayer
            url="/video/v1.mp4" // 替换为您的视频链接
            width="100%" // 设置视频宽度
            height="auto" // 设置视频高度
            controls // 显示播放控制条
          />
        </div>
      </Col>
      <Col span={10}>
        <Card title="微小语音监听" height={ContainerHeight}>
          <List
            dataSource={voiceText}
            pagination={{
              position: 'bottom',
              align: 'center',
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 5,
            }}
            size='small'
            renderItem={(item, render, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  title={item.audioText ? item.audioText : '--'}
                  description={
                    <Space>
                      {<Tag icon={<SyncOutlined />} color="processing">{item.displayTime}</Tag>}
                    </Space>
                  }
                />
                <div>
                  {item.alarmCodeName ? <Tag icon={<CloseCircleOutlined />} color="error">{item.alarmCodeName}</Tag> : ''}
                  {item.audioText ? '' : <Tag icon={<SyncOutlined spin />} color="warning">无法识别</Tag>}
                </div>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  )
};

export default VoiceTab;
