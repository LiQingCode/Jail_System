import React, { useRef, useEffect, useState } from 'react';
import { Carousel, Row, Col, Button, Card } from 'antd';
import ReactPlayer from 'react-player';
import { VideoCameraOutlined} from '@ant-design/icons';

import '../../index';

const ContainerHeight = 280;
const LifeInfoVideoMuddle = (props) => {
    const carouselRef = useRef(null);
    const [deviceChannels, setDeviceChannels] = useState([]);
    const SetSlide = (props) => {
        carouselRef.current.goTo(props);
        console.log(props);
    }

    const fetchPersonData = () => {
        fetch(global.BaseURL.url+`/LifeInfo/${props.roomId}/getVideoChannels`)
            .then((res) => res.json())
            .then((data) => {
                setDeviceChannels(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(()=>{
        fetchPersonData();
    },[props]);

    return (
        <Card bordered={false}>
            <Carousel ref={carouselRef} height={ContainerHeight} dots={false}>
                {deviceChannels.map((item, index) => (
                    <div key={index}>
                        <ReactPlayer
                            url="video/v1.mp4" // 替换为您的视频链接
                            width="100%" // 设置视频宽度
                            height="auto" // 设置视频高度
                            playing
                        />
                    </div>
                ))}
            </Carousel>
            <Row style={{ textAlign: 'center' }}>
                {
                    deviceChannels.map((item, index) => (
                        <Col key={index} span={Math.floor(24/deviceChannels.length)}><Button type='primary' icon={<VideoCameraOutlined />} onClick={() => SetSlide(index)}>通道{index+1}</Button></Col>
                    ))
                }
            </Row>
        </Card>
    )
}
export default LifeInfoVideoMuddle;