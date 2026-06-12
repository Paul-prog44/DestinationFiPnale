package com.example.Back.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomDto {
    private Integer id;
    private Integer number;
    private BigDecimal pricePerNight;
    private Integer capacity;
    private String title;
    private String summary;
    private String imgPath;
}