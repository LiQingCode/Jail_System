package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.VitalSignEntity;
import com.jsc.pm.mapper.VitalSignMapper;
import com.jsc.pm.service.IVitalSignService;
import org.springframework.stereotype.Service;

@Service
public class VitalSignServiceImpl extends ServiceImpl<VitalSignMapper, VitalSignEntity> implements IVitalSignService {
}
