package com.example.Back.service;

import org.springframework.stereotype.Service;

import com.example.Back.dto.FlightSearchRequest;
import com.example.Back.dto.FlightSearchResponse;
import com.example.Back.repository.FlightRepository;


@Service
public class FlightService {

    private final FlightRepository flightRepository;

    public FlightSearchResponse findByArrivalCityId(FlightSearchRequest request) {
        if (flightRepository.findByArrivalCityId(request.getArrivalCityId()).isEmpty()) {
            throw new Error()
        }
    }
    
}
