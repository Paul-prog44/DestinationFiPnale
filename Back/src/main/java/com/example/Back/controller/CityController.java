package com.example.Back.controller;

import org.springframework.data.annotation.AccessType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    
}
