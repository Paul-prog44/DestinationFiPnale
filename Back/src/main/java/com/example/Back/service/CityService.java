package com.example.Back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Back.dto.CityCreationRequest;
import com.example.Back.dto.CityDto;
import com.example.Back.dto.CitySearchResponse;
import com.example.Back.model.City;
import com.example.Back.repository.CityRepository;

import jakarta.persistence.EntityNotFoundException;
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

    public void delete(Integer id) {

        if (!cityRepository.existsById(id)) {
            throw new EntityNotFoundException("Suppression impossible, l'identifiant " +id+ " ne correspond à aucune ville." );
        }
        cityRepository.deleteById(id);
    } 

    public CityDto get(Integer id) {
        
        if (!cityRepository.existsById(id)) {
            throw new EntityNotFoundException("Suppression impossible, l'identifiant " +id+ " ne correspond à aucune ville." );
        }
        City savedCity = cityRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Aucune ville ne correspond à l'identifiant " +id+  "."));

        return CityDto.builder()
            .id(savedCity.getId())
            .name(savedCity.getName())
            .country(savedCity.getCountry())
            .build();
    }

    
}
