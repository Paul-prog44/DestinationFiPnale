package com.example.Back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class CarBookingResponse {
    private Integer id;
    private String carBrand;
    private String carModel;
    private String cityName;
    private String country;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal price;
    private String status;
    private long numberOfDays;
}