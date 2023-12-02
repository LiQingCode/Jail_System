package com.jsc.pm.controller;

import com.jsc.pm.entity.AlarmEventEntity;
import com.jsc.pm.entity.AlarmTypeEntity;
import com.jsc.pm.entity.RoomDeviceEntity;
import com.jsc.pm.service.*;
import com.jsc.pm.utils.RefineItemForDisplay;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;

@Api("事件回溯")
@CrossOrigin
@RestController
@RequestMapping("/VideoHistory")
public class VideoHistoryController {
    @Autowired
    private IRoomService roomService;
    @Autowired
    private IRoomAllocationService roomAllocationService;
    @Autowired
    private IRemainService remainService;
    @Autowired
    private IRoomDeviceService roomDeviceService;
    @Autowired
    private IPersonService personService;
    @Autowired
    private IAlarmEventService alarmEventService;
    @Autowired
    private IAlarmTypeService alarmTypeService;

    @PostMapping("/{roomId}/searchByTime")
    List<AlarmEventEntity> searchByTime(@RequestBody Map<String, Object> requestData){
        String startTime = (String) requestData.get("startTime");
        String endTime = (String) requestData.get("endTime");
        String roomId = (String) requestData.get("roomId");
        // System.out.println(roomId);
        // 这里默认一个房间对应一套设备，且该套设备不会被其他房间使用
        List<RoomDeviceEntity> roomDeviceEntities = roomDeviceService.getRoomDeviceEntitiesByRoomId(roomId);
        List<AlarmEventEntity> alarmEventEntitiesOfAll = new ArrayList<>();
        for(RoomDeviceEntity roomDeviceEntity:roomDeviceEntities)
        {
            String deviceId = roomDeviceEntity.getDeviceId();
            List<AlarmEventEntity>alarmEventEntities = alarmEventService.getAlarmEventEntities(deviceId, startTime, endTime, "0");
            RefineItemForDisplay.refineAlarmItem(alarmEventEntities, alarmTypeService);
            alarmEventEntitiesOfAll.addAll(alarmEventEntities);
        }
        alarmEventEntitiesOfAll.sort(Comparator.comparing(AlarmEventEntity::getEventDate).reversed());
        return alarmEventEntitiesOfAll;
    }

    @PostMapping("/{roomId}/timeLineSearchByCurrentTime")
    List<AlarmEventEntity> timeLineSearchByCurrentTime(@RequestBody Map<String, Object> requestData){
        String currentTime = (String) requestData.get("currentTime");
        String roomId = (String) requestData.get("roomId");
        // 这里默认一个房间对应一套设备，且该套设备不会被其他房间使用
        List<RoomDeviceEntity> roomDeviceEntities = roomDeviceService.getRoomDeviceEntitiesByRoomId(roomId);
        List<AlarmEventEntity> alarmEventEntitiesOfAll = new ArrayList<>();
        for(RoomDeviceEntity roomDeviceEntity:roomDeviceEntities)
        {
            String deviceId = roomDeviceEntity.getDeviceId();
            // System.out.println(deviceId);
            // 查询当天内的所有报警记录
            List<AlarmEventEntity>alarmEventEntities = alarmEventService.getAlarmEventEntitiesByCurrentTime(deviceId, currentTime);
            RefineItemForDisplay.refineAlarmItem(alarmEventEntities, alarmTypeService);
            alarmEventEntitiesOfAll.addAll(alarmEventEntities);
        }
        alarmEventEntitiesOfAll.sort(Comparator.comparing(AlarmEventEntity::getEventDate).reversed());
        return alarmEventEntitiesOfAll;
    }

}
