package com.example.Back.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CarBookingRequest {
    private Integer carId;
    private LocalDate startDate;
    private LocalDate endDate;
}