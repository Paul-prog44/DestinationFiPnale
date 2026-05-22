package com.example.Back.repository;
import com.example.Back.model.FlightBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;



public interface FlightBookingRepository extends JpaRepository<FlightBooking, Integer>{
    Optional<FlightBooking> findById(Integer id);
}
