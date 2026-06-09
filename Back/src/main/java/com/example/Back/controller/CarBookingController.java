package com.example.Back.controller;

import com.example.Back.dto.CarBookingRequest;
import com.example.Back.dto.CarBookingResponse;
import com.example.Back.service.CarBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class CarBookingController {

    private final CarBookingService carBookingService;

    // Créer une réservation (connecté obligatoire)
    @PostMapping("/cars")
    public ResponseEntity<CarBookingResponse> createBooking(
            @RequestBody CarBookingRequest request,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(carBookingService.createBooking(request, email));
    }

    // Mes réservations
    @GetMapping("/my")
    public ResponseEntity<List<CarBookingResponse>> getMyBookings(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(carBookingService.getMyBookings(email));
    }

    // Annuler une réservation
    @PatchMapping("/cars/{id}/cancel")
    public ResponseEntity<CarBookingResponse> cancelBooking(
            @PathVariable Integer id,
            Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(carBookingService.cancelBooking(id, email));
    }
}