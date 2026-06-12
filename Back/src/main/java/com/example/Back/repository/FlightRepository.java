package com.example.Back.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor; //Permet la recherche par critères optionnels
import com.example.Back.model.Flight;

public interface FlightRepository extends JpaRepository<Flight, Integer>, JpaSpecificationExecutor<Flight> {
    List<Flight> findByArrivalCityId(Integer arrivalCityId);

    List<Flight> findByDepartureCityId(Integer departureCityId);
}
