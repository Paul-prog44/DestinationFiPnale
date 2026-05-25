package com.example.Back.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FlightDto {
    private Integer id;
    private String companyName;
    private LocalDateTime deptTime;
    private LocalDateTime arrTime;
    private String depCity;
    private String arrCity;
    private BigDecimal price; 
}
