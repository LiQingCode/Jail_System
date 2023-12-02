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
@TableName("tbl_room_allocation")
@ApiModel(value = "房间留置对象", description = "房间留置对象表")
public class RoomAllocationEntity {
    @ApiModelProperty(value = "房间分配表id")
    @TableId(value = "room_allocation_id", type = IdType.AUTO)
    private String roomAllocationId;

    @ApiModelProperty(value = "房间id")
    @TableField(value = "room_id")
    private String RoomId;

    @ApiModelProperty(value = "对应对象id")
    @TableField(value = "purpose_id")
    private String purposeId;

    @ApiModelProperty(value = "分配开始时间")
    @TableField(value = "allocation_start_time")
    private Date allocationStartTime;

    @ApiModelProperty(value = "分配结束时间")
    @TableField(value = "allocation_end_time")
    private Date allocationEndTime;

    @ApiModelProperty(value = "分配状态")
    @TableField(value = "allocation_status")
    private Integer allocationStatus;
}
