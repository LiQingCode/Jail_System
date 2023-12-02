package com.jsc.pm.utils;

import com.jsc.pm.entity.AlarmEventEntity;
import com.jsc.pm.entity.AlarmTypeEntity;
import com.jsc.pm.entity.WhisperAlarmEntity;
import com.jsc.pm.service.IAlarmTypeService;
import com.jsc.pm.service.IPersonService;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class RefineItemForDisplay {
    public static List<AlarmEventEntity> refineAlarmItem(List<AlarmEventEntity> alarmEventEntities, IAlarmTypeService alarmTypeService){
        String pattern = "yyyy-MM-dd hh:mm:ss";
        SimpleDateFormat f= new SimpleDateFormat(pattern);
        f.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai")); // 设置北京时区
        for (AlarmEventEntity alarmEventEntity:alarmEventEntities) {
            AlarmTypeEntity alarmTypeEntity = alarmTypeService.getAlarmTypeEntitiesByTypeCode(alarmEventEntity.getEventType()).get(0);
            String typeName = alarmTypeEntity.getTypeName();
            String level = alarmTypeEntity.getLevel();
            // 修改为java8 语法
            switch (level){
                case "0" : alarmEventEntity.setEventLevel("一般报警");break;
                case "1" : alarmEventEntity.setEventLevel("重要报警");break;
                case "2" : alarmEventEntity.setEventLevel("紧急报警");break;
                default : alarmEventEntity.setEventLevel("暂无报警");break;
            }
            alarmEventEntity.setEventTypeName(typeName);
            alarmEventEntity.setEventDisplayDate(f.format(alarmEventEntity.getEventDate()));
        }
        return alarmEventEntities;
    }

    public static List<WhisperAlarmEntity> refineWhisperItem(List<WhisperAlarmEntity> whisperAlarmEntities, IPersonService personService){
        for(WhisperAlarmEntity whisperAlarmEntity:whisperAlarmEntities){
            String pattern = "yyyy-MM-dd hh:mm:ss";
            SimpleDateFormat f= new SimpleDateFormat(pattern);
            f.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai")); // 设置北京时区
            String time = f.format(whisperAlarmEntity.getBeginTime());
            whisperAlarmEntity.setDisplayTime(time);
            whisperAlarmEntity.setPersonName(personService.getById(whisperAlarmEntity.getPersonId()).getPersonName());
        }
        return whisperAlarmEntities;
    }

    public static Date getNewDay(Date date, Integer days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_MONTH, days);
        return calendar.getTime();
    }
}
