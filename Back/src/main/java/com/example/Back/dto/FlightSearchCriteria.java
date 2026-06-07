package com.example.Back.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class FlightSearchCriteria {
    private String from;
    private String to;
    private LocalDate dateIn; 
    private LocalDate dateOut;
    private Integer passengers;
}