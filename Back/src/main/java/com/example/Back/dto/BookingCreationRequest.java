package com.example.Back.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BookingCreationRequest {
    private Integer userId;
    private Integer flightBookingId;
    private Integer roomBookingId;
    private Integer carBookingId;
    private LocalDateTime createdAt;
    private String status;
}
