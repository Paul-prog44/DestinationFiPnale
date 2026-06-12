package com.example.Back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    List<Hotel> findByCityId(Integer cityId);
}