package com.example.Back.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "car_booking")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CarBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    private LocalDate startDate;
    private LocalDate endDate;


    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    @Column(length = 20)
    private String status;
}