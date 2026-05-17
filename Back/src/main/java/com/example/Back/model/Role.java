package com.example.Back.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter 
@Setter 
@NoArgsConstructor
@AllArgsConstructor 
@Builder
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 30)
    private String name;
}