package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.VitalSignTypeEntity;
import com.jsc.pm.mapper.VitalSignMapper;
import com.jsc.pm.mapper.VitalSignTypeMapper;
import com.jsc.pm.service.IVitalSignTypeService;
import org.springframework.stereotype.Service;

@Service
public class VitalSignTypeServiceImpl extends ServiceImpl<VitalSignTypeMapper, VitalSignTypeEntity> implements IVitalSignTypeService {
}
