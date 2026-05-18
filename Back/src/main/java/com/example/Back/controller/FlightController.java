package com.example.Back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Back.dto.*;
import com.example.Back.service.FlightService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/flight")
@RequiredArgsConstructor
public class FlightController {
    
    private final FlightService flightService;

    @PostMapping("/create")
    public ResponseEntity<FlightCreationResponse> create(@RequestBody FlightCreationRequest request) {
        return ResponseEntity.ok(flightService.create(request));
    }

    @PostMapping("/search")
    public ResponseEntity<FlightSearchResponse> search(@RequestBody FlightSearchRequest request) {
        return ResponseEntity.ok(flightService.findByArrivalCityId(request));
    }

}
