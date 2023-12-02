package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.AlarmEventEntity;
import com.jsc.pm.entity.RoomAllocationEntity;
import com.jsc.pm.mapper.AlarmEventMapper;
import com.jsc.pm.service.IAlarmEventService;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.jsc.pm.utils.RefineItemForDisplay.getNewDay;

@Service
public class AlarmEventServiceImpl extends ServiceImpl<AlarmEventMapper, AlarmEventEntity> implements IAlarmEventService {
    @Override
    public List<AlarmEventEntity> getAlarmEventEntities(String deviceId, String startTime, String endTime, String handleResult){
        QueryWrapper<AlarmEventEntity> queryWrapper = new QueryWrapper<>();
        if(!deviceId.equals(""))
            queryWrapper.eq("device_id", deviceId); // 构建条件查询
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
            queryWrapper.gt("event_date", startDate).lt("event_date", endDate); // 构建条件查询
        }
        if(handleResult.equals("1")||handleResult.equals("0"))
            queryWrapper.eq("handle_result", handleResult);
        return list(queryWrapper);
    }
    @Override
    public List<AlarmEventEntity> getAlarmEventEntitiesByCurrentTime(String deviceId, String currentTime)
    {
        QueryWrapper<AlarmEventEntity> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("device_id", deviceId);
        String pattern = "yyyy-MM-dd";
        Integer days = 1;
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        Date currentDate = new Date();
        Date startDate = new Date();
        Date endDate = new Date();
        try {
            // 将时间字符串解析为Date对象
            currentDate = sdf.parse(currentTime);
            startDate = currentDate;
            endDate = getNewDay(currentDate, days);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        // 查询事件当天内的所有事件
        queryWrapper.gt("event_date", startDate).lt("event_date", endDate); // 构建条件查询
        return list(queryWrapper);
    }
}
