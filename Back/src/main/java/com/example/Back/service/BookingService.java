package com.example.Back.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Back.dto.BookingCreationRequest;
import com.example.Back.dto.BookingDto;
import com.example.Back.dto.BookingSearchByUserIdRequest;
import com.example.Back.dto.BookingSearchByUserIdResponse;
import com.example.Back.model.Booking;
import com.example.Back.model.CarBooking;
import com.example.Back.model.FlightBooking;
import com.example.Back.model.RoomBooking;
import com.example.Back.model.User;
import com.example.Back.repository.BookingRepository;
import com.example.Back.repository.FlightBookingRepository;
import com.example.Back.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {
    
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final FlightBookingRepository flightBookingRepository;
    //TODO private final RoomBookingRepository roomBookingRepitory:
    //TODO private final CarBookingRepository carBookingRepository;

    public BookingSearchByUserIdResponse findByUserId(Integer userId) {

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

    public BookingDto create(BookingCreationRequest request) {

        Booking booking = new Booking();

        User user = userRepository.getReferenceById(request.getUserId());
        FlightBooking flightBooking = null;
        RoomBooking roomBooking = null;
        CarBooking carBooking = null;

        booking.setUser(user);
        booking.setFlightBooking(flightBooking);
        booking.setCarBooking(carBooking);
        booking.setRoomBooking(roomBooking);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setStatus("PENDING");

        Booking savedBooking = bookingRepository.save(booking);

        return BookingDto.builder()
        .id(savedBooking.getId())
        .userId(savedBooking.getUser().getId())
        .flightBookingId(null)
        .roomBookingId(null)
        .carBookingId(null)
        .createdAt(savedBooking.getCreatedAt())
        .status(savedBooking.getStatus())
        .build();
    }

    @Transactional //Atomicté de transaction
    public BookingDto addFlightToBooking(Integer bookingId, Integer flightBookingId) {
        Booking booking  = bookingRepository.findById(bookingId)
        .orElseThrow(() -> new EntityNotFoundException("Cette réservation n'existe pas"));

        FlightBooking flightBooking = flightBookingRepository.findById(flightBookingId)
        .orElseThrow(() -> new EntityNotFoundException("Cette réservation de vol n'existe pas"));

        booking.setFlightBooking(flightBooking);

        Booking savedBooking = bookingRepository.save(booking);

        return BookingDto.builder()
        .id(savedBooking.getId())
        .userId(savedBooking.getUser().getId())
        .flightBookingId(flightBooking.getId())
        .roomBookingId(null)
        .carBookingId(null)
        .createdAt(savedBooking.getCreatedAt())
        .status(savedBooking.getStatus())
        .build();
    }

    public BookingDto get(Integer bookingId) {

        Booking savedBooking  = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new EntityNotFoundException("Cette réservation n'existe pas"));
    
        return BookingDto.builder()
            .id(savedBooking.getId())
            .userId(savedBooking.getUser().getId())
            .flightBookingId(savedBooking.getFlightBooking() != null? savedBooking.getFlightBooking().getId(): null)
            .roomBookingId(savedBooking.getRoomBooking() != null? savedBooking.getRoomBooking().getId(): null)
            .carBookingId(savedBooking.getCarBooking() != null? savedBooking.getCarBooking().getId():null)
            .createdAt(savedBooking.getCreatedAt())
            .status(savedBooking.getStatus())
            .build();
    }

} 
