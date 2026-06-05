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

    @PostMapping
    public ResponseEntity<FlightDto> create(@RequestBody FlightCreationRequest request) {
        return ResponseEntity.ok(flightService.create(request));
    }

    @GetMapping("/arrivalCity/{cityId}")
    public ResponseEntity<FlightSearchResponse> search(@PathVariable Integer cityId) {
        return ResponseEntity.ok(flightService.findByArrivalCityId(cityId));
    }

    @GetMapping("/search")
    public ResponseEntity<FlightSearchResponse> search(@ModelAttribute FlightSearchCriteria criteria) {

        System.out.println("Critères reçus : " + criteria); 
        
        return ResponseEntity.ok(flightService.search(criteria));

    }

}
