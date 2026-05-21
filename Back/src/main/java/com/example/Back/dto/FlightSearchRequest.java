package com.example.Back.dto;

import lombok.Data;

@Data
public class FlightSearchRequest {
    private Integer arrivalCityId;
    private Integer departureCityId;
}
