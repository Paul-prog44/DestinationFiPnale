package com.example.Back.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Back.dto.BookingDto;
import com.example.Back.dto.BookingSearchByUserIdRequest;
import com.example.Back.dto.BookingSearchByUserIdResponse;
import com.example.Back.model.Booking;
import com.example.Back.repository.BookingRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {
    
    private final BookingRepository bookingRepository;

    public BookingSearchByUserIdResponse findByUserId(BookingSearchByUserIdRequest request) {
        Integer userId = request.getUserId();

        List<Booking> results = bookingRepository.findByUserId(userId);

        if (results.isEmpty()) {
            throw new EntityNotFoundException("Il n'existe pas de réservation pour l'utilisateur id: "+userId+ ".");
        }

        List<BookingDto> bookingDtos = results.stream()
        .map(booking -> 
            BookingDto.builder()
            .id(booking.getId())
            .userId(booking.getUser().getId())
            .flightBookingId(booking.getFlightBooking() != null ? booking.getFlightBooking().getId() : null)
            .roomBookingId(booking.getRoomBooking() != null ? booking.getRoomBooking().getId() : null)
            .carBookingId(booking.getCarBooking() != null ? booking.getCarBooking().getId() : null)
            .createdAt(booking.getCreatedAt())
            .status(booking.getStatus())
            .build()
        )
        .toList();

        return new BookingSearchByUserIdResponse(bookingDtos);

    }
} 
