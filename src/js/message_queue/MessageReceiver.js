import React, { useEffect, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import { MessageContext } from './MessageContext';
import '../../index';
const MessageReceiver = () => {
  const { setAbnormalMessages, setNormalMessages } = useContext(MessageContext);
  useEffect(() => {
    // 创建 WebSocket 连接
    // const ws = new WebSocket('ws://localhost:15674/ws');

    // 创建 STOMP 客户端
    const client = new Client({
      brokerURL: global.RabbitMQ.url,
      connectHeaders: {
        login: global.RabbitMQ.login,
        passcode: global.RabbitMQ.passcode,
      },
      debug: (str) => {
        // 如果需要调试信息，可以在这里打印出来
        console.log(str);
      },
    });

    // 监听连接事件
    client.onConnect = (frame) => {
      console.log('STOMP client connected:', frame);

      // 订阅消息队列
      const subscriptionAbnormal = client.subscribe(global.RabbitMQ.queueAlarm, (message) => {
        // 处理接收到的消息
        const body = JSON.parse(message.body);
        console.log('Received message:', body);

        // 在接收到新的消息时，更新消息数组
        setAbnormalMessages((prevMessages) => [...prevMessages, body]);
      });

      const subscriptionNormal = client.subscribe(global.RabbitMQ.queueRealTime, (message) => {
        const body = JSON.parse(message.body);
        console.log('Received message:', body);
        setNormalMessages((prevMessages) => [...prevMessages, body]);
      });
    };

    // 监听连接错误事件
    client.onStompError = (frame) => {
      console.log('STOMP client error:', frame);
    };

    // 连接 STOMP 客户端
    client.activate();

    // 当组件卸载时，取消订阅并关闭连接
    return () => {
      client.deactivate();
    };
  }, []);
  return <></>;
};

export default MessageReceiver;
