package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.RemainEntity;
import com.jsc.pm.mapper.RemainMapper;
import com.jsc.pm.service.IRemainService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RemainServiceImpl extends ServiceImpl<RemainMapper, RemainEntity> implements IRemainService {
    @Override
    public List<RemainEntity> getRemainEntities(Integer remainStatus){
        QueryWrapper<RemainEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("remain_status", remainStatus);
        return list(queryWrapper);
    }
}
