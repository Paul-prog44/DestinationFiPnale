package com.monprojet.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "city")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 20)
    private String name;

    @Column(length = 30)
    private String country;
}