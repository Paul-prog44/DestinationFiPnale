package com.example.Back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.Back.dto.BookingCreationRequest;
import com.example.Back.dto.BookingDto;
import com.example.Back.dto.BookingSearchByUserIdResponse;
import com.example.Back.dto.RoomBookingCreationRequest;
import com.example.Back.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {
    
    private final BookingService bookingService;

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> get(@PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.get(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<BookingSearchByUserIdResponse> searchByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(bookingService.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<BookingDto> create(@RequestBody BookingCreationRequest request) {
        return ResponseEntity.ok(bookingService.create(request));
    }

    @PostMapping("/room")
    public ResponseEntity<BookingDto> createRoomBooking(
            @RequestBody RoomBookingCreationRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(bookingService.createRoomBooking(request, authentication.getName()));
    }

}
