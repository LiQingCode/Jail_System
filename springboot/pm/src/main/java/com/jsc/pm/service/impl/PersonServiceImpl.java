package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.PersonEntity;
import com.jsc.pm.mapper.PersonMapper;
import com.jsc.pm.service.IPersonService;
import org.springframework.stereotype.Service;

@Service
public class PersonServiceImpl extends ServiceImpl<PersonMapper, PersonEntity> implements IPersonService {
}
