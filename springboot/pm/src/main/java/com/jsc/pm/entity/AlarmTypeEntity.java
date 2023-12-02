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

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tbl_alarm_type")
@ApiModel(value = "警告类型对象", description = "警告类型信息表")
public class AlarmTypeEntity {
    @ApiModelProperty(value = "告警类型id")
    @TableId(value = "id", type = IdType.AUTO)
    private String id;

    @ApiModelProperty(value = "类型code")
    @TableField(value = "type_code")
    private String typeCode;

    @ApiModelProperty(value = "类型名称")
    @TableField(value = "type_name")
    private String typeName;

    @ApiModelProperty(value = "告警等级")
    @TableField(value = "level")
    private String level;

}
