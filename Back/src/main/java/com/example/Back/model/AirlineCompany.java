package com.example.Back.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "airline_company")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AirlineCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 20)
    private String name;
}