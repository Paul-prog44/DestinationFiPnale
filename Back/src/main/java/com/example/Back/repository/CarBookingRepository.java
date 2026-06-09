package com.example.Back.repository;

import com.example.Back.model.CarBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;

public interface CarBookingRepository extends JpaRepository<CarBooking, Integer> {

    @Query("""
        SELECT COUNT(b) > 0 FROM CarBooking b
        WHERE b.car.id = :carId
        AND b.status != 'CANCELLED'
        AND b.startDate < :endDate
        AND b.endDate > :startDate
    """)
    boolean isCarAlreadyBooked(
            @Param("carId") Integer carId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}