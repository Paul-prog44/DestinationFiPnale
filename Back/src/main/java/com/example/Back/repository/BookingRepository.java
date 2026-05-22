package com.example.Back.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.model.Booking;
import com.example.Back.model.FlightBooking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserId(Integer userId);

    Optional<Booking> findById(Integer id);

}
