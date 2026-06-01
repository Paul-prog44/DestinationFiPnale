package com.example.Back.service;

import com.example.Back.dto.CarBookingRequest;
import com.example.Back.dto.CarBookingResponse;
import com.example.Back.model.*;
import com.example.Back.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarBookingService {

    private final CarBookingRepository carBookingRepository;
    private final CarRepository carRepository;
    private final CityRepository cityRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    public CarBookingResponse createBooking(CarBookingRequest request, String userEmail) {

        Car car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new RuntimeException("Voiture introuvable"));

        City city = cityRepository.findById(request.getCityId())
                .orElseThrow(() -> new RuntimeException("Ville introuvable"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        // Validation des dates
        if (request.getStartDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("La date de début ne peut pas être dans le passé");
        }
        if (!request.getStartDate().isBefore(request.getEndDate())) {
            throw new RuntimeException("La date de début doit être avant la date de fin");
        }

        // Disponibilité
        if (carBookingRepository.isCarAlreadyBooked(car.getId(), request.getStartDate(), request.getEndDate())) {
            throw new RuntimeException("Cette voiture est déjà réservée sur cette période");
        }

        // Calcul prix
        long numberOfDays = ChronoUnit.DAYS.between(request.getStartDate(), request.getEndDate());
        BigDecimal price = car.getPricePerDay().multiply(BigDecimal.valueOf(numberOfDays));

        // 1. Crée le CarBooking
        CarBooking carBooking = CarBooking.builder()
                .car(car)
                .city(city)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .price(price)
                .status("PENDING")
                .build();
        carBookingRepository.save(carBooking);

        // 2. Crée le Booking qui relie User + CarBooking
        Booking booking = Booking.builder()
                .user(user)
                .carBooking(carBooking)
                .createdAt(LocalDateTime.now())
                .status("PENDING")
                .build();
        bookingRepository.save(booking);

        return toResponse(carBooking, numberOfDays);
    }

    public List<CarBookingResponse> getMyBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        return bookingRepository.findByUserId(user.getId())
                .stream()
                .filter(b -> b.getCarBooking() != null)
                .map(b -> {
                    CarBooking cb = b.getCarBooking();
                    long days = ChronoUnit.DAYS.between(cb.getStartDate(), cb.getEndDate());
                    return toResponse(cb, days);
                })
                .toList();
    }

    public CarBookingResponse cancelBooking(Integer carBookingId, String userEmail) {
        // Retrouve le Booking lié à ce CarBooking
        Booking booking = bookingRepository.findByUserId(
                        userRepository.findByEmail(userEmail)
                                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable")).getId()
                )
                .stream()
                .filter(b -> b.getCarBooking() != null && b.getCarBooking().getId().equals(carBookingId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Réservation introuvable ou non autorisée"));

        // Annule les deux
        booking.setStatus("CANCELLED");
        booking.getCarBooking().setStatus("CANCELLED");

        bookingRepository.save(booking);
        carBookingRepository.save(booking.getCarBooking());

        long days = ChronoUnit.DAYS.between(
                booking.getCarBooking().getStartDate(),
                booking.getCarBooking().getEndDate()
        );
        return toResponse(booking.getCarBooking(), days);
    }

    private CarBookingResponse toResponse(CarBooking booking, long numberOfDays) {
        return new CarBookingResponse(
                booking.getId(),
                booking.getCar().getBrand(),
                booking.getCar().getModel(),
                booking.getCity().getName(),
                booking.getCity().getCountry(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getPrice(),
                booking.getStatus(),
                numberOfDays
        );
    }
}