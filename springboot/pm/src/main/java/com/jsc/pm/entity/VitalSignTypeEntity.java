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
@TableName("tbl_vital_signs_type")
@ApiModel(value = "生命体征类型对象", description = "生命体征类型表")
public class VitalSignTypeEntity {
    @ApiModelProperty(value = "生命体征类型id")
    @TableId(value = "id", type = IdType.AUTO)
    private byte id;

    @ApiModelProperty(value = "数据类型名称")
    @TableField(value = "type_name")
    private String typeName;

    @ApiModelProperty(value = "显示名称")
    @TableField(value = "display_name")
    private String displayName;
}
