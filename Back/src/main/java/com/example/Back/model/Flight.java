package com.example.Back.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "flight")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private AirlineCompany company;

    private LocalDateTime deptTime;
    private LocalDateTime arrTime;

    @ManyToOne
    @JoinColumn(name = "dep_city_id")
    private City departureCity;

    @ManyToOne
    @JoinColumn(name = "arr_city_id")
    private City arrivalCity;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;
}