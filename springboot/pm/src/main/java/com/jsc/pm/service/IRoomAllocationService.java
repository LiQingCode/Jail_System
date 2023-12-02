package com.jsc.pm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jsc.pm.entity.RoomAllocationEntity;

import java.util.List;

public interface IRoomAllocationService extends IService<RoomAllocationEntity> {
    List<RoomAllocationEntity> getRoomAllocationEntitiesByRoomIdAndStatus(String roomId, Integer status);
}
