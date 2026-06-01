package com.example.Back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.model.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findByHotelId(Integer hotelId);
}