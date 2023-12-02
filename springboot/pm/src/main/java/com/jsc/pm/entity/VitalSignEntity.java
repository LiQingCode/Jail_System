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
@TableName("tbl_vital_signs_realtime_data")
@ApiModel(value = "vitalSign对象", description = "生命体征信息表")
public class VitalSignEntity implements Serializable {
    @ApiModelProperty(value = "体征id")
    @TableId(value = "id", type = IdType.AUTO)
    private String id;

    @ApiModelProperty(value = "设备类型id")
    @TableField(value = "device_type_id")
    private byte dataTypeId;

    @ApiModelProperty(value = "设备id")
    @TableField(value = "device_id")
    private String deviceId;

    @ApiModelProperty(value = "设备捕获值")
    @TableField(value = "value")
    private String value;

    @ApiModelProperty(value = "时间")
    @TableField(value = "time")
    private Date time;
}
