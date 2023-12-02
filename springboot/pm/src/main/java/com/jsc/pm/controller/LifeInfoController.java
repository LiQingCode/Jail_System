package com.jsc.pm.controller;

import com.jsc.pm.entity.*;
import com.jsc.pm.service.*;
import com.jsc.pm.utils.RefineItemForDisplay;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Api("生命体征信息管理")
@CrossOrigin
@RestController
@RequestMapping("/LifeInfo")
public class LifeInfoController {
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

    @ApiOperation(value="查询该指间居内人员基本信息", notes = "查询该指间居内人员基本信息")
    @RequestMapping("{roomId}")
    public PersonEntity getPersonOfRoom(@PathVariable String roomId){
        // 查询分配有效的间居记录
        // System.out.println(roomId);
        String roomName = roomService.getById(roomId).getRoomName();
        PersonEntity person = new PersonEntity("1","目前无人或当前房间分配违法",roomName);
        List<RoomAllocationEntity> roomAllocationEntities = roomAllocationService.getRoomAllocationEntitiesByRoomIdAndStatus(roomId, 0);
        // 处理同时分配多人间居的违法情况
        if(roomAllocationEntities.size()==1)
        {
            String purposeId = roomAllocationEntities.get(0).getPurposeId();
            String personId = remainService.getById(purposeId).getCasePersonId();
            person = personService.getById(personId);
            person.setRoomName(roomName);
            // System.out.println(person.toString());
        }
        return person;
    }

    @ApiOperation(value="查询该指间居内视频设备", notes = "查询该指间居内视频设备")
    @RequestMapping("/{roomId}/getVideoChannels")
    public List<RoomDeviceEntity> getDeviceOfRoom(@PathVariable String roomId){
        List<RoomDeviceEntity> roomDeviceEntities = roomDeviceService.getRoomDeviceEntitiesByRoomId(roomId);
        roomDeviceEntities.removeIf(x->!x.getDeviceType().equals("VideoChannel"));
        return roomDeviceEntities;
    }

    @ApiOperation(value="查询该指间居的异常情况", notes = "查询该指间居的异常情况")
    @RequestMapping("{roomId}/AbnormalInfo")
    public List<AlarmEventEntity> getAbnormalInfo(@PathVariable String roomId){
        // 查询分配有效的间居记录
        // System.out.println(roomId);
        // 这里默认一个房间对应多套设备，但针对单一设备不会被其他房间使用
        List<RoomDeviceEntity> roomDeviceEntities = roomDeviceService.getRoomDeviceEntitiesByRoomId(roomId);
        List<AlarmEventEntity> alarmEventEntitiesOfAll = new ArrayList<>();
        for(RoomDeviceEntity roomDeviceEntity:roomDeviceEntities)
        {
            String deviceId = roomDeviceEntity.getDeviceId();
            // 未处理的报警
            List<AlarmEventEntity>alarmEventEntities = alarmEventService.getAlarmEventEntities(deviceId, "", "", "0");
            RefineItemForDisplay.refineAlarmItem(alarmEventEntities, alarmTypeService);
            alarmEventEntitiesOfAll.addAll(alarmEventEntities);
        }
        alarmEventEntitiesOfAll.sort(Comparator.comparing(AlarmEventEntity::getEventDate).reversed());
        return alarmEventEntitiesOfAll;
    }
}
