package com.example.Back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Back.dto.CityDto;
import com.example.Back.dto.CitySearchResponse;
import com.example.Back.model.City;
import com.example.Back.repository.CityRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CityService {

    private final CityRepository cityRepository;


    public CitySearchResponse getAll() {
        List<City> results = cityRepository.findAll();

        List<CityDto> cityDtos = results.stream()
        .map(city ->
            CityDto.builder()
            .id(city.getId())
            .name(city.getName())
            .country(city.getCountry())
            .build()
        )
        .toList();

        return new CitySearchResponse(cityDtos);
    }

    
}
