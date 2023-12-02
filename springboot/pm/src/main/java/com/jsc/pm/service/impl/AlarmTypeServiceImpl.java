package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.AlarmTypeEntity;
import com.jsc.pm.entity.RoomDeviceEntity;
import com.jsc.pm.mapper.AlarmTypeMapper;
import com.jsc.pm.service.IAlarmTypeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlarmTypeServiceImpl extends ServiceImpl<AlarmTypeMapper, AlarmTypeEntity> implements IAlarmTypeService {
    @Override
    public List<AlarmTypeEntity> getAlarmTypeEntitiesByTypeCode(String typeCode){
        QueryWrapper<AlarmTypeEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("type_code", typeCode); // 构建条件查询
        return list(queryWrapper);
    }
}
