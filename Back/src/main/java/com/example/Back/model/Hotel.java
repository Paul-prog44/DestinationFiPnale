package com.monprojet.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotel")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @Column(length = 100)
    private String adress;

    private Integer stars;

    @Column(length = 50)
    private String imgPath;

    @Column(columnDefinition = "json")
    private String addInfo; 
}