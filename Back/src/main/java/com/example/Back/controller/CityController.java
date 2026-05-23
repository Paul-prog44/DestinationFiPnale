package com.example.Back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Back.dto.CityCreationRequest;
import com.example.Back.dto.CityDto;
import com.example.Back.dto.CitySearchResponse;
import com.example.Back.service.CityService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/city")
@RequiredArgsConstructor
public class CityController {

    private final CityService cityService;

    @GetMapping
    public ResponseEntity<CitySearchResponse> getAll() {
        return ResponseEntity.ok(cityService.getAll());
    }

    @PostMapping("/create")
    public ResponseEntity<CityDto> create(@RequestBody CityCreationRequest request) {
        return ResponseEntity.ok(cityService.create(request));
    }
    
}
