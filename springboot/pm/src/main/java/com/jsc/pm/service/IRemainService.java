package com.jsc.pm.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jsc.pm.entity.RemainEntity;

import java.util.List;

public interface IRemainService extends IService<RemainEntity> {
    List<RemainEntity> getRemainEntities(Integer remainStatus);
}
