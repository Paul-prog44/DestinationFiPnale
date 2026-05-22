package com.example.Back.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FlightBookingDto {
    private Integer id;
    private Integer nbPassagers;
    private Integer obFlightId;
    private Integer ibFlightId;
    private String status;
}
