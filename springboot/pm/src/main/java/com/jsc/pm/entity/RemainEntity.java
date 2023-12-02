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
@TableName("tbl_remain")
@ApiModel(value = "Remain对象", description = "关联留置对象表")
public class RemainEntity {
    @ApiModelProperty(value = "关联id")
    @TableId(value = "remain_id", type = IdType.AUTO)
    private String remainId;

    @ApiModelProperty(value = "关联留置对象id")
    @TableField(value = "case_person_id")
    private String casePersonId;

    // 状态为1或2表示在留置房间，其余状态表示不在留置房间
    @ApiModelProperty(value = "关联留置对象状态")
    @TableField(value = "remain_status")
    private Integer remainStatus;

}
