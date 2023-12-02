package com.jsc.pm.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jsc.pm.entity.WhisperAlarmEntity;
import com.jsc.pm.entity.WhisperDeviceEntity;
import com.jsc.pm.mapper.WhisperDeviceMapper;
import com.jsc.pm.service.IWhisperDeviceService;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WhisperDeviceServiceImpl extends ServiceImpl<WhisperDeviceMapper, WhisperDeviceEntity> implements IWhisperDeviceService {
    @Override
    public List<WhisperAlarmEntity> getWhisperAlarmEntities(String roomId, String startTime, String endTime)
    {
        QueryWrapper<WhisperDeviceEntity> queryWrapper = new QueryWrapper<>();
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
            queryWrapper.gt("collect_time", startDate).lt("collect_time", endDate); // 构建条件查询
        }
        List<WhisperAlarmEntity> whisperAlarmEntities = new ArrayList<WhisperAlarmEntity>();
        for(WhisperDeviceEntity whisperDeviceEntity:list(queryWrapper))
        {
            WhisperAlarmEntity temp = new WhisperAlarmEntity();
            temp.setDeviceId(whisperDeviceEntity.getDeviceId());
            temp.setBeginTime(whisperDeviceEntity.getCollectTime());
            temp.setNormalVoice(Boolean.TRUE);
            temp.setPersonId(whisperDeviceEntity.getPersonId());
            temp.setRoomId(whisperDeviceEntity.getRoomId());
            temp.setAudioText(whisperDeviceEntity.getContent());
            whisperAlarmEntities.add(temp);
        }
        return whisperAlarmEntities;
    }
}
