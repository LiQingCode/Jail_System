package com.jsc.pm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jsc.pm.entity.AlarmEventEntity;
import com.jsc.pm.entity.WhisperAlarmEntity;
import com.jsc.pm.entity.WhisperDeviceEntity;

import java.util.List;

public interface IWhisperDeviceService extends IService<WhisperDeviceEntity> {
    List<WhisperAlarmEntity> getWhisperAlarmEntities(String roomId, String startTime, String endTime);
}
