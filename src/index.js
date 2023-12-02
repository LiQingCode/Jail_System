import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/antd.min.css';
import App from './js/App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './global.css'

// 测试环境
// global.RabbitMQ = { url: 'ws://192.5.52.178:15674/ws', login: 'ibvms', passcode: 'ibvms', queueAlarm: '/queue/DAS_Dev_VitalSigns_Alarm_Mq', queueRealTime: '/queue/DAS_Dev_VitalSigns_RealtimeData_Mq', }
// global.BaseURL = { url: 'http://192.5.52.239:9989' };
global.RabbitMQ = {url:'ws://localhost:15674/ws',login:'admin',passcode:'123456',queueAlarm:'/queue/DAS_Dev_VitalSigns_Alarm_Mq',queueRealTime:'/queue/DAS_Dev_VitalSigns_RealtimeData_Mq',}
global.BaseURL = {url:'http://localhost:8080'};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN} theme={{
      token: {
        colorBgLayout: '#eee'
      }
    }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);


reportWebVitals();
