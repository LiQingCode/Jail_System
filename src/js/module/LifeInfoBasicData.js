import React, { useEffect, useState, useContext } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import Icon, { HeartOutlined } from '@ant-design/icons';
// 自定义图标
const TidongSvg = () => (
    <svg t="1689580272222" className="icon" viewBox="0 0 1040 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3492" width="32" height="32"><path d="M1024 383.92832c0-79.174656-64.18432-143.36-143.36-143.36-79.174656 0-143.36 64.185344-143.36 143.36 0 76.802048 60.394496 139.495424 136.282112 143.184896-0.556032 7.822336-1.293312 17.467392-2.233344 28.387328l-186.561536 39.375872c-49.263616-37.056512-111.975424-56.546304-178.173952-50.223104-70.375424 6.721536-131.361792 41.330688-173.074432 91.851776-33.2032 40.214528-81.747968 67.765248-137.764864 73.114624-55.436288 5.295104-107.798528-12.155904-147.857408-44.701696-5.264384-4.844544-12.484608-7.520256-20.16768-6.787072-14.354432 1.371136-24.882176 14.119936-23.51104 28.47744 0.678912 7.104512 4.1472 13.267968 9.214976 17.518592l-0.043008 0.0512C63.91296 745.892864 130.347008 768.330752 200.71936 761.61024c70.371328-6.720512 131.359744-41.330688 173.070336-91.854848 33.2032-40.214528 81.747968-67.7632 137.766912-73.112576 55.706624-5.320704 108.30848 12.319744 148.441088 45.170688 4.723712 4.622336 11.1616 7.35232 17.997824 7.323648 0.016384 0 0.031744 0.001024 0.048128 0.001024 0.008192 0 0.016384 0 0.022528 0 0.871424 0.004096 1.750016-0.034816 2.635776-0.118784 1.666048-0.15872 3.277824-0.478208 4.82816-0.927744l180.289536-38.052864c-6.28736 53.66784-16.279552 114.87232-31.337472 149.257216-22.868992 52.225024-58.708992 52.56704-99.668992 19.116032-35.668992-29.129728-104.592384-124.891136-204.383232-133.121024-90.78272-7.487488-184.3712 114.840576-231.457792 180.82304l0.004096 0.003072c-3.028992 4.263936-4.816896 9.472-4.816896 15.100928 0 14.420992 11.691008 26.112 26.112 26.112 10.099712 0 18.853888-5.738496 23.197696-14.128128l0.017408 0.011264c15.442944-24.927232 103.581696-155.9808 180.722688-156.663808 67.566592-0.598016 137.903104 82.829312 178.176 123.846656 51.275776 52.224 132.811776 43.414528 169.643008-26.966016 35.308544-67.472384 46.436352-223.121408 49.156096-271.966208C980.615168 503.970816 1024 449.020928 1024 383.92832zM880.64 475.06432c-50.332672 0-91.136-40.803328-91.136-91.136s40.803328-91.136 91.136-91.136 91.136 40.803328 91.136 91.136S930.972672 475.06432 880.64 475.06432z" fill="#3f8600" p-id="3493"></path></svg>
);
const BedSvg = () => (
    <svg t="1689580250413" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3240" width="32" height="32"><path d="M298.666667 533.333333a128 128 0 1 0-128-128 128 128 0 0 0 128 128z m0-170.666666a42.666667 42.666667 0 1 1-42.666667 42.666666 42.666667 42.666667 0 0 1 42.666667-42.666666z m554.666666-85.333334h-341.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v256H128v-341.333333a42.666667 42.666667 0 0 0-85.333333 0v554.666666a42.666667 42.666667 0 0 0 85.333333 0v-128h768v128a42.666667 42.666667 0 0 0 85.333333 0v-384a128 128 0 0 0-128-128z m42.666667 298.666667h-341.333333v-213.333333h298.666666a42.666667 42.666667 0 0 1 42.666667 42.666666z" p-id="3241" fill="#3f8600"></path></svg>
);
const TemperatureSvg = () => (
    <svg t="1689580225037" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2985" width="32" height="32"><path d="M512 999.872a217.856 217.856 0 0 1-217.6-217.6A217.6 217.6 0 0 1 358.464 628.48L358.4 177.728c0-84.736 68.864-153.6 153.6-153.6s153.6 68.864 153.6 153.6l-0.064 450.752a217.6 217.6 0 0 1 64.064 153.792c0 119.936-97.6 217.6-217.6 217.6zM512 75.328c-56.448 0-102.4 45.952-102.4 102.4l0.064 473.216-8.512 7.616a166.144 166.144 0 0 0-55.552 123.648c0 91.776 74.624 166.4 166.4 166.4s166.4-74.624 166.4-166.4c0-47.04-20.224-92.096-55.552-123.648l-8.512-7.616 0.064-473.216c0-56.448-45.952-102.4-102.4-102.4z" p-id="2986" fill="#3f8600"></path><path d="M588.8 783.616a76.8 76.8 0 1 1-153.6 0 76.8 76.8 0 0 1 153.6 0z" p-id="2987" fill="#3f8600"></path><path d="M512 886.016c-56.448 0-102.4-45.952-102.4-102.4s45.952-102.4 102.4-102.4c56.448 0 102.4 45.952 102.4 102.4s-45.952 102.4-102.4 102.4z m0-153.6a51.264 51.264 0 0 0 0 102.4 51.264 51.264 0 0 0 0-102.4z" p-id="2988" fill="#3f8600"></path><path d="M473.6 348.416h76.8v435.2H473.6v-435.2zM878.976 154.304h-128a25.6 25.6 0 1 1 0-51.2h128a25.6 25.6 0 1 1 0 51.2zM878.976 243.904h-128a25.6 25.6 0 1 1 0-51.2h128a25.6 25.6 0 1 1 0 51.2zM878.976 333.504h-128a25.6 25.6 0 1 1 0-51.2h128a25.6 25.6 0 1 1 0 51.2z" p-id="2989" fill="#3f8600"></path></svg>
);
const LungSvg = () => (
    <svg t="1689579249251" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2600" width="32" height="32"><path d="M938.709333 725.333333c-0.042667 170.666667-0.042667 170.666667-170.666666 170.666667-170.666667 0-213.333333-128-213.333334-256 0-16.128-0.768-39.168-1.109333-66.133333l86.314667 49.877333L640 640c0 118.442667 34.816 170.666667 128 170.666667 48.64 0 68.693333-0.298667 83.754667-1.621334 1.28-14.976 1.578667-35.072 1.578666-83.712 0-136.746667-29.994667-257.408-78.293333-337.066666-35.754667-58.965333-68.821333-78.634667-86.698667-72.661334-12.501333 4.181333-25.813333 27.733333-35.456 69.248l-76.373333-44.074666c15.744-51.072 41.898667-91.776 84.821333-106.112 128-42.666667 277.461333 170.666667 277.333334 490.666666zM362.666667 234.666667c42.965333 14.336 69.12 55.04 84.864 106.112L371.157333 384.853333c-9.642667-41.514667-22.997333-65.066667-35.456-69.248-17.92-5.973333-50.986667 13.653333-86.698666 72.618667C200.661333 467.925333 170.666667 588.586667 170.666667 725.333333c0 48.64 0.298667 68.693333 1.621333 83.712 14.976 1.322667 35.072 1.621333 83.712 1.621334 93.184 0 128-52.224 128-170.666667l0.170667-16.298667 86.314666-49.834666c-0.426667 27.008-1.152 50.005333-1.152 66.133333 0 128-42.666667 256-213.333333 256s-170.666667 0-170.666667-170.666667C85.333333 405.333333 234.666667 192 362.666667 234.666667zM554.666667 85.333333v316.672l200.362666 115.712-42.666666 73.898667L512 475.946667l-200.362667 115.669333-42.666666-73.898667L469.333333 402.005333V85.333333h85.333334z" p-id="2601" fill="#3f8600"></path></svg>
);
const TidongIcon = (props) => <Icon component={TidongSvg} {...props} />;
const BedIcon = (props) => <Icon component={BedSvg} {...props} />;
const TemperatureIcon = (props) => <Icon component={TemperatureSvg} {...props} />;
const LungIcon = (props) => <Icon component={LungSvg} {...props} />;

const ContainerHeight = 280;

const LifeInfoBasicData = (allProps) => {
    const [heartRate, setHeartRate] = useState(0);
    const [breath, setBreath] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [bedStatus, setBedStatus] = useState(-1);
    const [bodyMove, setBodyMove] = useState(-1);

    useEffect(() => {
        if (Object.is(allProps.queueRoomId, allProps.roomId)) {
            // 处理后端返回的数据
            const dataType = allProps.lastNormalMessage.content.dataType;
            const dataValue = allProps.lastNormalMessage.content.value;
            switch (dataType) {
                case 1: setHeartRate(dataValue); break;
                case 2: setBreath(dataValue); break;
                case 3: setBodyMove(dataValue); break;
                case 4: setTemperature(dataValue); break;
                case 5: setBedStatus(dataValue); break;
                default: break;
            }
        }
    }, [allProps]);

    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <Card bordered={false} height={ContainerHeight}>
                    <Statistic
                        title="心率"
                        value={heartRate}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<HeartOutlined />}
                        suffix="次/分"
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="呼吸"
                        value={breath}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<LungIcon style={{ fontSize: '32px' }} />}
                        suffix="次/分"
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="体温"
                        value={temperature}
                        precision={1}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<TemperatureIcon />}
                        suffix="℃"
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="在床/离床"
                        value={bedStatus === -1 ? "--" : bedStatus === 1 ? "离床" : "在床"}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<BedIcon />}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                        title="体动"
                        value={bodyMove === -1 ? "--" : bodyMove === 1 ? "活动" : "安静"}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<TidongIcon />}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default LifeInfoBasicData;