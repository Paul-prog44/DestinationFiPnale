package com.example.Back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Back.dto.CityCreationRequest;
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

    public CityDto create(CityCreationRequest request) {
        
        System.out.println("Request reçue : " + request.toString());
        City city = new City();

        city.setName(request.getName());
        city.setCountry(request.getCountry());

        City savedCity = cityRepository.save(city);

        return CityDto.builder()
            .id(savedCity.getId())
            .name(savedCity.getName())
            .country(savedCity.getCountry())
            .build();
    }

    
}
