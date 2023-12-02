package com.jsc.pm.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tbl_alarm_events")
@ApiModel(value = "alarmEvent对象", description = "告警事件信息表")
public class AlarmEventEntity implements Serializable {
    @ApiModelProperty(value = "告警事件id")
    @TableId(value = "id", type = IdType.AUTO)
    private String id;

    @ApiModelProperty(value = "设备id")
    @TableField(value = "device_id")
    private String deviceId;

    @ApiModelProperty(value = "事件类型")
    @TableField(value = "event_type")
    private String eventType;

    @ApiModelProperty(value = "事件细节")
    @TableField(value = "event_detail")
    private String eventDetail;

    @ApiModelProperty(value = "事件时间")
    @TableField(value = "event_date")
    private Date eventDate;

    @ApiModelProperty(value = "异常情况处理结果")
    @TableField(value = "handle_result")
    private String handleResult;

    @ApiModelProperty(value = "事件所在房间")
    @TableField(exist = false)
    private String eventRoom;

    @ApiModelProperty(value = "事件类型名称")
    @TableField(exist = false)
    private String eventTypeName;

    @ApiModelProperty(value = "告警等级")
    @TableField(exist = false)
    private String eventLevel;

    @ApiModelProperty(value = "前端事件显示时间")
    @TableField(exist = false)
    private String eventDisplayDate;

}
