package com.example.Back.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RegisterRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private LocalDate dateOfBirth;
}