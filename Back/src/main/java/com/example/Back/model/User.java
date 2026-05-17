package com.example.Back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 30)
    private String firstname;

    @Column(length = 50)
    private String lastname;

    @Column(length = 100, unique = true)
    private String email;

    @Column(length = 100)
    private String password;

    private LocalDate dateOfBirth;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}