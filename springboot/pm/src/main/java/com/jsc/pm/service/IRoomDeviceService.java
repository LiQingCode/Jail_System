package com.jsc.pm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jsc.pm.entity.RoomDeviceEntity;

import java.util.List;

public interface IRoomDeviceService extends IService<RoomDeviceEntity> {
    List<RoomDeviceEntity> getRoomDeviceEntitiesByRoomId(String roomId);

    List<RoomDeviceEntity> getRoomDeviceEntitiesByDeviceId(String deviceId);
}
