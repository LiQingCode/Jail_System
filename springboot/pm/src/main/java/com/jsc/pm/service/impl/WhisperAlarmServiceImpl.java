package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.WhisperAlarmEntity;
import com.jsc.pm.mapper.WhisperAlarmMapper;
import com.jsc.pm.service.IWhisperAlarmService;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class WhisperAlarmServiceImpl extends ServiceImpl<WhisperAlarmMapper, WhisperAlarmEntity> implements IWhisperAlarmService {
    @Override
    public List<WhisperAlarmEntity> getWhisperAlarmEntities(String roomId, String startTime, String endTime)
    {
        QueryWrapper<WhisperAlarmEntity> queryWrapper = new QueryWrapper<>();
        if(!roomId.equals(""))
            queryWrapper.eq("room_id", roomId); // 构建条件查询
        if(!(startTime.equals("")||endTime.equals(""))){
            String pattern = "yyyy/MM/dd hh:mm:ss";
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            Date startDate = new Date();
            Date endDate = new Date();
            try {
                // 将时间字符串解析为Date对象
                startDate = sdf.parse(startTime);
                endDate = sdf.parse(endTime);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            // 只查这个时间范围内开始的语音记录
            queryWrapper.gt("begin_time", startDate).lt("begin_time", endDate); // 构建条件查询
        }
        return list(queryWrapper);
    }
}
