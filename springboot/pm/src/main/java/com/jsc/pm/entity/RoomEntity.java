package com.jsc.pm.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tbl_room")
@ApiModel(value = "Room对象", description = "房间信息表")
public class RoomEntity implements Serializable {
    @ApiModelProperty(value = "房间id")
    @TableId(value = "room_id", type = IdType.AUTO)
    private String roomId;

    @ApiModelProperty(value = "房间名称")
    @TableField(value = "room_name")
    private String roomName;

    @ApiModelProperty(value = "心率值")
    @TableField(exist = false)
    private Integer heartRate;

    @ApiModelProperty(value = "呼吸值")
    @TableField(exist = false)
    private Integer breathRate;

    @ApiModelProperty(value = "体动次数")
    @TableField(exist = false)
    private Integer bodyMoveRate;

    @ApiModelProperty(value = "房间有无人状态")
    @TableField(exist = false)
    private Boolean roomStatus;

    @ApiModelProperty(value = "房间人员异常状态数量")
    @TableField(exist = false)
    private Integer personStatus;

}
