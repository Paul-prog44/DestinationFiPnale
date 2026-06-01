package com.example.Back.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotelDto {
    private Integer id;
    private String title;
    private String city;
    private String adress;
    private Integer stars;
    private String imgPath;
    private String summary;
}