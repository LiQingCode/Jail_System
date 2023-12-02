package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.RoomDeviceEntity;
import com.jsc.pm.mapper.RoomDeviceMapper;
import com.jsc.pm.service.IRoomDeviceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomDeviceServiceImpl extends ServiceImpl<RoomDeviceMapper, RoomDeviceEntity> implements IRoomDeviceService {
    @Override
    public List<RoomDeviceEntity> getRoomDeviceEntitiesByRoomId(String roomId)
    {
        QueryWrapper<RoomDeviceEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("room_id", roomId); // 构建条件查询
        return list(queryWrapper);
    }
    @Override
    public List<RoomDeviceEntity> getRoomDeviceEntitiesByDeviceId(String deviceId){
        QueryWrapper<RoomDeviceEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("device_id", deviceId); // 构建条件查询
        return list(queryWrapper);
    }
}
