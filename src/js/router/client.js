import '../../index';
// "proxy": "http://localhost:8080",

export const getBasicDatas = () => fetch(global.BaseURL.url+'/MainMuddle/getBasicData')

export const getAlarmEvents = () => fetch(global.BaseURL.url+'/MainMuddle/getAlarmEvents')

export const getAllRooms = () => fetch(global.BaseURL.url+'/MainMuddle/getAllRooms')

export const getQueueRoomId = (props) =>
fetch(global.BaseURL.url+'/MainMuddle/getQueueRoomId', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
})
    