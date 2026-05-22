package com.example.Back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Back.dto.FlightBookingSearchResponse;
import com.example.Back.dto.FlightBookingSearchRequest;
import com.example.Back.service.FlightBookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/flightBooking")
@RequiredArgsConstructor
public class FlightBookingController {

    private final FlightBookingService flightBookingService;

    @PostMapping("/search")
    public ResponseEntity<FlightBookingSearchResponse> search(@RequestBody FlightBookingSearchRequest request) {
        return ResponseEntity.ok(flightBookingService.findById(request));
    }
    
}
