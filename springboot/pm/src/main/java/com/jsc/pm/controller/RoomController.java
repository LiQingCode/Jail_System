package com.jsc.pm.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.jsc.pm.entity.*;
import com.jsc.pm.service.*;
import com.jsc.pm.utils.RefineItemForDisplay;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Api("指间居信息管理")
@CrossOrigin
@RestController
@RequestMapping("/MainMuddle")
public class RoomController {

    @Autowired
    private IRoomService roomService;
    @Autowired
    private IRoomDeviceService roomDeviceService;
    @Autowired
    private IAlarmEventService alarmEventService;
    @Autowired
    private IAlarmTypeService alarmTypeService;
    @Autowired
    private IRemainService remainService;
    @Autowired
    private IRoomAllocationService roomAllocationService;


    @ApiOperation(value="查询各个指间居内人员基本信息", notes = "查询各个指间居内人员基本信息")
    @RequestMapping("getBasicData")
    public BasicData getBasicData(){
        // 房间总数
        Integer roomCount = roomService.list().size();
        // 留置人员总数
        Integer personCount = remainService.getRemainEntities(1).size()+remainService.getRemainEntities(2).size();
        // 异常人员的统计
        // 找到该房间对应设备中未处理的事件，若事件大于0，则有异常
        // 找到该房间留置人员数量，若没有留置人员，则无异常
        List<RoomEntity> roomEntities = roomService.list();
        Integer abnormalPersonCount = 0;
        for(RoomEntity roomEntity:roomEntities)
        {
            String roomId = roomEntity.getRoomId();
            // 找到分配有效中的留置人员分配表
            List<RoomAllocationEntity> roomAllocationEntities = roomAllocationService.getRoomAllocationEntitiesByRoomIdAndStatus(roomId,0);
            List<String> remainOfAllocation = roomAllocationEntities.stream().map(RoomAllocationEntity::getPurposeId).toList();
            List<RemainEntity> remainEntities = remainService.getRemainEntities(1);
            List<RemainEntity> remainEntitiesStatus2 = remainService.getRemainEntities(2);
            if(!CollectionUtils.isEmpty(remainEntitiesStatus2))
                remainEntities.addAll(remainEntitiesStatus2);
            List<String> remainOfAll = new ArrayList<>();
            List<String> remainOfRemain = remainEntities.stream().map(RemainEntity::getRemainId).toList();
            if(!CollectionUtils.isEmpty(remainOfRemain))
                remainOfAll = Stream.concat(remainOfAllocation.stream(),remainOfRemain.stream()).collect(Collectors.toList());
            Set<String> remainIds = new HashSet<>(remainOfAll);
            List<String> remainIdList = new ArrayList<>(remainIds);
            // 找到异常房间
            List<RoomDeviceEntity> roomDeviceEntities = roomDeviceService.getRoomDeviceEntitiesByRoomId(roomId);
            Integer alarmCount = 0;
            for(RoomDeviceEntity roomDeviceEntity:roomDeviceEntities)
            {
                alarmCount = alarmCount + alarmEventService.getAlarmEventEntities(roomDeviceEntity.getDeviceId(),"","","0").size();
            }
            if(alarmCount>0&&remainIdList.size()>0)
                abnormalPersonCount = abnormalPersonCount + 1;
        }
        BasicData basicData = new BasicData();
        basicData.setRoomCount(roomCount);
        basicData.setPersonCount(personCount);
        basicData.setAbnormalPersonCount(abnormalPersonCount);
        return basicData;
    }

    @ApiOperation(value="查询各个指间居内人员基本信息", notes = "查询各个指间居内人员基本信息")
    @RequestMapping("getAllRooms")
    public List<RoomEntity> getAllRooms(){
        List<RoomEntity> roomEntities = roomService.list();
        for(RoomEntity roomEntity:roomEntities)
        {
            List<RoomAllocationEntity> roomAllocationEntities = roomAllocationService.getRoomAllocationEntitiesByRoomIdAndStatus(roomEntity.getRoomId(),0);
            for(RoomAllocationEntity roomAllocationEntity:roomAllocationEntities)
            {
                RemainEntity remainEntity = remainService.getById(roomAllocationEntity.getPurposeId());
                Integer remainStatus = 0;
                if (remainEntity!=null)
                {
                    remainStatus = remainEntity.getRemainStatus();
                }
                if(remainStatus==1 || remainStatus==2)
                    roomEntity.setRoomStatus(Boolean.TRUE);
                else
                    roomEntity.setRoomStatus(Boolean.FALSE);
            }
            List<RoomDeviceEntity> roomDeviceEntities = roomDeviceService.getRoomDeviceEntitiesByRoomId(roomEntity.getRoomId());
            Integer alarmCounter = 0;
            for(RoomDeviceEntity roomDeviceEntity:roomDeviceEntities)
                alarmCounter = alarmCounter + alarmEventService.getAlarmEventEntities(roomDeviceEntity.getDeviceId(),"","","0").size();
            roomEntity.setPersonStatus(alarmCounter);
        }
        return roomEntities;
    }

    @ApiOperation(value="查询告警信息", notes = "查询告警信息")
    @RequestMapping("getAlarmEvents")
    public List<AlarmEventEntity> getAlarmEvents(){
        List<AlarmEventEntity> alarmEventEntities = alarmEventService.list();
        SimpleDateFormat f= new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        f.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai")); // 设置北京时区
        for (AlarmEventEntity alarmEventEntity:alarmEventEntities) {
            String deviceId = alarmEventEntity.getDeviceId();
            // 这里默认一个房间对应多套设备，且任意某套设备不会被其他房间使用
            List<RoomDeviceEntity> roomDeviceEntities = roomDeviceService.getRoomDeviceEntitiesByDeviceId(deviceId);
            // 若roomDevice中无法找到设备与房间之间的对应关系，即设备与没有关联到房间，则将该报警记录移除（实际上这条报警记录违法）
            if(roomDeviceEntities.size()==0) {
                alarmEventEntities.remove(alarmEventEntity);
            }
            else{
                String roomName = roomService.getById(roomDeviceEntities.get(0).getRoomId()).getRoomName();
                alarmEventEntity.setEventRoom(roomName);
            }
        }
        RefineItemForDisplay.refineAlarmItem(alarmEventEntities,alarmTypeService);
        // 移除已经处理的事件并排序
        alarmEventEntities.removeIf(x->x.getHandleResult().equals("1"));
        alarmEventEntities.sort(Comparator.comparing(AlarmEventEntity::getEventDate).reversed());
        return alarmEventEntities;
    }

    @ApiOperation(value="查询各个指间居内人员基本信息", notes = "查询各个指间居内人员基本信息")
    @PostMapping("getQueueRoomId")
    public String getQueueRoomId(@RequestBody Map<String, Object> requestData){
        String deviceId = (String) requestData.get("deviceId");
        String roomId = "";
        List<RoomDeviceEntity> roomDeviceEntities = roomDeviceService.getRoomDeviceEntitiesByDeviceId(deviceId);
        if(roomDeviceEntities.size()!=0)
            roomId = roomDeviceEntities.get(0).getRoomId();
        return roomId;
    }
}
