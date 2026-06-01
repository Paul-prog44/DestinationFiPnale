package com.example.Back.repository;

import com.example.Back.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findByBrand(String brand);
}