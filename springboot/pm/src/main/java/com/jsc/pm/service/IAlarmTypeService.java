package com.jsc.pm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jsc.pm.entity.AlarmTypeEntity;
import com.jsc.pm.entity.RoomDeviceEntity;

import java.util.List;

public interface IAlarmTypeService extends IService<AlarmTypeEntity> {
    List<AlarmTypeEntity> getAlarmTypeEntitiesByTypeCode(String typeCode);
}
