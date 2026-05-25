package com.example.Back.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;


@Data
@Builder
public class BookingDto {
    private Integer id;
    private Integer userId;
    private Integer flightBookingId;
    private Integer roomBookingId;
    private Integer carBookingId;
    private LocalDateTime createdAt;
    private String status;
}
