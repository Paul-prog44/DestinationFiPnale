package com.example.Back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String firstname;
    private String role;   // nom du rôle, ex: "USER"
}