package com.example.Back.repository.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;
import com.example.Back.dto.FlightSearchCriteria;
import com.example.Back.model.Flight;

public class FlightSpecification {

    public static Specification<Flight> getFlightsByCriteria(FlightSearchCriteria criteria) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
    
                if (criteria.getFrom() != null && !criteria.getFrom().isBlank()) {
                    predicates.add(criteriaBuilder.equal(
                        root.get("departureCity").get("name"), criteria.getFrom()
                    ));
                }
    
                if (criteria.getTo() != null && !criteria.getTo().isBlank()) {
                    predicates.add(criteriaBuilder.equal(
                        root.get("arrivalCity").get("name"), criteria.getTo()
                    ));
                }
    
                if (criteria.getDateIn() != null) {
                    predicates.add(criteriaBuilder.equal(
                        criteriaBuilder.function("DATE", java.sql.Date.class, root.get("deptTime")),
                        java.sql.Date.valueOf(criteria.getDateIn())
                    ));
                }
    
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    
}
