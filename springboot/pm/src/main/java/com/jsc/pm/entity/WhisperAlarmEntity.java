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

import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tbl_whisper_alarm_info")
@ApiModel(value = "微小语音警告对象", description = "微小语音警告信息表")
public class WhisperAlarmEntity {
    @ApiModelProperty(value = "微小语音警告对象id")
    @TableId(value = "id", type = IdType.AUTO)
    private String id;

    @ApiModelProperty(value = "设备id")
    @TableField(value = "device_id")
    private String deviceId;

    @ApiModelProperty(value = "房间id")
    @TableField(value = "room_id")
    private String roomId;

    @ApiModelProperty(value = "讲话人id")
    @TableField(value = "person_id")
    private String personId;

    @ApiModelProperty(value = "转录文本")
    @TableField(value = "audio_text")
    private String audioText;

    @ApiModelProperty(value = "报警代码")
    @TableField(value = "alarm_code")
    private String alarmCode;

    @ApiModelProperty(value = "报警代码名称")
    @TableField(value = "alarm_code_name")
    private String alarmCodeName;

    @ApiModelProperty(value = "语音开始时间")
    @TableField(value = "begin_time")
    private Date beginTime;

    @ApiModelProperty(value = "语音结束时间")
    @TableField(value = "end_time")
    private Date endTime;

    @ApiModelProperty(value = "讲话人名字")
    @TableField(exist = false)
    private String personName;

    @ApiModelProperty(value = "是否为正常语音，默认为false")
    @TableField(exist = false)
    private Boolean NormalVoice = Boolean.FALSE;

    @ApiModelProperty(value = "前端显示时间")
    @TableField(exist = false)
    private String displayTime;
}
