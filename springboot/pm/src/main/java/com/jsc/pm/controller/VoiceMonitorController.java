package com.jsc.pm.controller;

import com.jsc.pm.entity.AlarmEventEntity;
import com.jsc.pm.entity.WhisperAlarmEntity;
import com.jsc.pm.service.IPersonService;
import com.jsc.pm.service.IWhisperAlarmService;
import com.jsc.pm.service.IWhisperDeviceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

import com.jsc.pm.utils.RefineItemForDisplay;

@Api("微小语音信息管理")
@CrossOrigin
@RestController
@RequestMapping("/VoiceMonitor")
public class VoiceMonitorController {
    @Autowired
    IWhisperAlarmService whisperAlarmService;
    @Autowired
    IWhisperDeviceService whisperDeviceService;
    @Autowired
    IPersonService personService;

    @ApiOperation(value="查询该指间居内历史微小语音信息", notes = "查询该指间居内历史微小语音信息")
    @RequestMapping("/{roomId}/searchByTime")
    public List<WhisperAlarmEntity> getWhisperAlarmEntityByTime(@RequestBody Map<String, Object> requestData){
        String startTime = (String) requestData.get("startTime");
        String endTime = (String) requestData.get("endTime");
        String roomId = (String) requestData.get("roomId");
        // 返回符合条件的异常微小语音列表
        List<WhisperAlarmEntity> whisperAlarmEntitiesOfAbnormal =  whisperAlarmService.getWhisperAlarmEntities(roomId,startTime,endTime);
        // 返回符合条件的正常微小语音列表
        List<WhisperAlarmEntity> whisperAlarmEntitiesOfNormal = whisperDeviceService.getWhisperAlarmEntities(roomId,startTime,endTime);
        // 两个列表合并，并按照开始时间逆序
        whisperAlarmEntitiesOfAbnormal.addAll(whisperAlarmEntitiesOfNormal);
        whisperAlarmEntitiesOfAbnormal.sort(Comparator.comparing(WhisperAlarmEntity::getBeginTime).reversed());
        return RefineItemForDisplay.refineWhisperItem(whisperAlarmEntitiesOfAbnormal, personService);
    }

    @ApiOperation(value="查询该指间居内的实时微小语音", notes = "查询该指间居的实时微小语音")
    @RequestMapping("/{roomId}/realTimeData")
    public List<WhisperAlarmEntity> getRealTimeData(@PathVariable String roomId){
        // 返回符合条件的异常微小语音列表
        List<WhisperAlarmEntity> whisperAlarmEntitiesOfAbnormal =  whisperAlarmService.getWhisperAlarmEntities(roomId,"","");
        // 返回符合条件的正常微小语音列表
        List<WhisperAlarmEntity> whisperAlarmEntitiesOfNormal = whisperDeviceService.getWhisperAlarmEntities(roomId,"","");
        // 两个列表合并，并按照开始时间逆序
        whisperAlarmEntitiesOfAbnormal.addAll(whisperAlarmEntitiesOfNormal);
        whisperAlarmEntitiesOfAbnormal.sort(Comparator.comparing(WhisperAlarmEntity::getBeginTime).reversed());
        return RefineItemForDisplay.refineWhisperItem(whisperAlarmEntitiesOfAbnormal, personService);
    }
}
