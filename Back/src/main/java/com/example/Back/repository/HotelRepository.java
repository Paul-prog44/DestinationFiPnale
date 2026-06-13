package com.example.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Back.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {
}