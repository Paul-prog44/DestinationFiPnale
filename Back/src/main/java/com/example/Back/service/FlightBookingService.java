package com.example.Back.service;

import org.springframework.stereotype.Service;

import com.example.Back.dto.FlightBookingDto;
import com.example.Back.dto.FlightBookingSearchRequest;
import com.example.Back.dto.FlightBookingSearchResponse;
import com.example.Back.model.FlightBooking;
import com.example.Back.repository.FlightBookingRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FlightBookingService {
    
    private final FlightBookingRepository flightBookingRepository;

    public FlightBookingSearchResponse findById(FlightBookingSearchRequest request) {
        Integer flightBookingId = request.getFlightBookingId();

        FlightBooking result = flightBookingRepository.findById(flightBookingId)
        .orElseThrow(() -> new EntityNotFoundException("Il n'existe pas de réservation pour l'identifiant "+flightBookingId+ "."));

        FlightBookingDto flightBooking = FlightBookingDto.builder()
        .id(result.getId())
        .nbPassagers(result.getNbPassagers())
        .status(result.getStatus())
        .obFlightId(result.getOutboundFlight().getId()!= null ? result.getOutboundFlight().getId() : null)
        .ibFlightId(result.getInboundFlight() != null ? result.getInboundFlight().getId() : null)
        .build();
    
        return new FlightBookingSearchResponse(flightBooking);
        
    }
}
