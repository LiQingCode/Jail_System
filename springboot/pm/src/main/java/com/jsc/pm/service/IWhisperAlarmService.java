package com.jsc.pm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jsc.pm.entity.WhisperAlarmEntity;

import java.util.List;

public interface IWhisperAlarmService extends IService<WhisperAlarmEntity> {
    List<WhisperAlarmEntity> getWhisperAlarmEntities(String roomId, String startTime, String endTime);
}
