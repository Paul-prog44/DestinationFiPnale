package com.example.Back.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class RoomBookingCreationRequest {
    private Integer roomId;
    private LocalDate startDate;
    private LocalDate endDate;
}