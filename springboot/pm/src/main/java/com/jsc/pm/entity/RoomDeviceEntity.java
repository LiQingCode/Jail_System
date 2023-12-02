package com.jsc.pm.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("tbl_room_device")
@ApiModel(value = "RoomDevice对象", description = "房间设备列表")
public class RoomDeviceEntity {
    @ApiModelProperty(value = "房间分配表id")
    @TableId(value = "id", type = IdType.AUTO)
    private String id;

    @ApiModelProperty(value = "房间id")
    @TableField(value = "room_id")
    private String roomId;

    @ApiModelProperty(value = "设备id")
    @TableField(value = "device_id")
    private String deviceId;

    @ApiModelProperty(value = "设备类型")
    @TableField(value = "device_type")
    private String deviceType;
}
