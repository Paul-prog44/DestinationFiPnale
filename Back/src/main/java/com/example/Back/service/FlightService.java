package com.example.Back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Back.dto.FlightCreationRequest;
import com.example.Back.dto.FlightSearchRequest;
import com.example.Back.dto.FlightSearchResponse;
import com.example.Back.model.AirlineCompany;
import com.example.Back.model.City;
import com.example.Back.model.Flight;
import com.example.Back.repository.AirlineCompanyRepository;
import com.example.Back.repository.CityRepository;
import com.example.Back.repository.FlightRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private final AirlineCompanyRepository airlineCompanyRepository;
    private final CityRepository cityRepository;

    public FlightSearchResponse findByArrivalCityId(FlightSearchRequest request) {
        List<Flight> results = flightRepository.findByArrivalCityId(request.getArrivalCityId());

        if (results.isEmpty()) {
            throw new EntityNotFoundException("Aucun résultat n'a été trouvé pour cette ville d'arrivée");
        }

        return new FlightSearchResponse();
    }

    public FlightSearchResponse findByDepartureCityId(FlightSearchRequest request) {
        List<Flight> results = flightRepository.findByDepartureCityId(request.getDepartureCityId());

        if (results.isEmpty()) {
            throw new EntityNotFoundException("Aucun résultat n'a été trouvé pour cette ville d'arrivée");
        }

        return new FlightSearchResponse();
    }

    public Flight create(FlightCreationRequest request) {

        Flight flight = new Flight();

        AirlineCompany airlineCompany = airlineCompanyRepository.getReferenceById(request.getCompanyId());
        City depCity = cityRepository.getReferenceById(request.getDepCityId());
        City arrCity = cityRepository.getReferenceById(request.getArrCityId());

        flight.setCompany(airlineCompany);
        flight.setArrTime(request.getArrTime());
        flight.setDeptTime(request.getDeptTime());
        flight.setDepartureCity(depCity);
        flight.setArrivalCity(arrCity);

        return flight;
    }
    
}
