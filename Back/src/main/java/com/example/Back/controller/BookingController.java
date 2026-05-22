package com.example.Back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Back.dto.BookingSearchByUserIdRequest;
import com.example.Back.dto.BookingSearchByUserIdResponse;
import com.example.Back.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {
    
    private final BookingService bookingService;

    @PostMapping("/search")
    public ResponseEntity<BookingSearchByUserIdResponse> searchByUserId(@RequestBody BookingSearchByUserIdRequest request) {
        return ResponseEntity.ok(bookingService.findByUserId(request));
    }
}
