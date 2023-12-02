package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.RoomEntity;
import com.jsc.pm.mapper.RoomMapper;
import com.jsc.pm.service.IRoomService;
import org.springframework.stereotype.Service;

@Service
public class RoomServiceImpl extends ServiceImpl<RoomMapper, RoomEntity> implements IRoomService {
}
