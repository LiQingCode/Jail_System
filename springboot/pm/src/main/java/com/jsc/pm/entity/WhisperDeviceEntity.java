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
@TableName("tbl_whisper_normal_info")
@ApiModel(value = "WhisperDevice对象", description = "正常微小语音信息表")
public class WhisperDeviceEntity implements Serializable {
    @ApiModelProperty(value = "语音id")
    @TableId(value = "id", type = IdType.AUTO)
    private String id;

    @ApiModelProperty(value = "房间id")
    @TableField(value = "room_id")
    private String roomId;

    @ApiModelProperty(value = "讲话人id")
    @TableField(value = "person_id")
    private String personId;

    @ApiModelProperty(value = "拾音器设备id")
    @TableField(value = "device_id")
    private String deviceId;

    @ApiModelProperty(value = "拾音内容")
    @TableField(value = "content")
    private String content;

    @ApiModelProperty(value = "语音拾取时间")
    @TableField(value = "collect_time")
    private Date collectTime;

    @ApiModelProperty(value = "讲话人名字")
    @TableField(exist = false)
    private String personName;
}
