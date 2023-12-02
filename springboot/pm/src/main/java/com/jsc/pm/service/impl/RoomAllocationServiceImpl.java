package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.RoomAllocationEntity;
import com.jsc.pm.entity.RoomDeviceEntity;
import com.jsc.pm.mapper.RoomAllocationMapper;
import com.jsc.pm.service.IRoomAllocationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomAllocationServiceImpl extends ServiceImpl<RoomAllocationMapper, RoomAllocationEntity> implements IRoomAllocationService {
    @Override
    public List<RoomAllocationEntity> getRoomAllocationEntitiesByRoomIdAndStatus(String roomId, Integer status){
        QueryWrapper<RoomAllocationEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("room_id", roomId).eq("allocation_status", status); // 构建条件查询
        return list(queryWrapper);
    }
}
