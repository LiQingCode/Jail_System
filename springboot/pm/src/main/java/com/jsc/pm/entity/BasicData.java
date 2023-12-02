package com.jsc.pm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 统计基本数据（包括房间总数、目前人员总数、异常人员总数）
 * */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BasicData {
    private Integer RoomCount;
    private Integer PersonCount;
    private Integer abnormalPersonCount;
}
