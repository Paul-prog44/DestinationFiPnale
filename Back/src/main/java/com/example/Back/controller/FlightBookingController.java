package com.example.Back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Back.dto.FlightBookingSearchResponse;
import com.example.Back.service.FlightBookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/flightBooking")
@RequiredArgsConstructor
public class FlightBookingController {

    private final FlightBookingService flightBookingService;

    @GetMapping("/{id}")
    public ResponseEntity<FlightBookingSearchResponse> search(@PathVariable Integer id) {
        return ResponseEntity.ok(flightBookingService.findById(id));
    }
    
}
