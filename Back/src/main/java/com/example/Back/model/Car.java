package com.example.Back.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "car")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 20)
    private String brand;

    @Column(length = 20)
    private String model;

    @Column(precision = 10, scale = 2)
    private BigDecimal pricePerDay;

    @Column(length = 100)
    private String imgPath;
}