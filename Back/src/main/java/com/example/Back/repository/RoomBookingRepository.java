package com.example.Back.repository;

import java.util.List;
import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.model.RoomBooking;

public interface RoomBookingRepository extends JpaRepository<RoomBooking, Integer> {
    List<RoomBooking> findByRoomId(Integer roomId);

    List<RoomBooking> findByRoomIdAndEndDateAfterAndStartDateBefore(
            Integer roomId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}