package com.jsc.pm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jsc.pm.entity.AlarmEventEntity;

import java.util.List;

public interface IAlarmEventService extends IService<AlarmEventEntity> {
    List<AlarmEventEntity> getAlarmEventEntities(String deviceId, String startTime, String endTime, String handleResult);
    List<AlarmEventEntity> getAlarmEventEntitiesByCurrentTime(String deviceId, String currentTime);
}
