package com.example.Back.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotelDetailsDto {
    private Integer id;
    private String title;
    private String city;
    private String adress;
    private Integer stars;
    private String imgPath;
    private String summary;
    private List<String> services;
    private List<RoomDto> rooms;
}