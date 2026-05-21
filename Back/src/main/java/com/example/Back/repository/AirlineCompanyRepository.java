package com.example.Back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Back.model.AirlineCompany;

public interface AirlineCompanyRepository  extends JpaRepository<AirlineCompany, Integer> {
}

