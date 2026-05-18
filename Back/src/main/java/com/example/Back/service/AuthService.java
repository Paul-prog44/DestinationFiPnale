package com.example.Back.service;

import com.example.Back.dto.*;
import com.example.Back.exception.EmailAlreadyUsedException;
import com.example.Back.model.Role;
import com.example.Back.model.User;
import com.example.Back.repository.RoleRepository;
import com.example.Back.repository.UserRepository;
import com.example.Back.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyUsedException(request.getEmail());
        }

        // Rôle USER par défaut — crée-le en BDD si absent
        Role role = roleRepository.findByName("USER")
                .orElseGet(() -> roleRepository.save(
                        Role.builder().name("USER").build()
                ));

        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDateOfBirth(request.getDateOfBirth());
        user.setCreatedAt(LocalDateTime.now());
        user.setRole(role);

        userRepository.save(user);

        String token = tokenProvider.generateToken(user.getEmail());
        return new AuthResponse(token, user.getEmail(), user.getFirstname(), role.getName());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        String token = tokenProvider.generateToken(user.getEmail());
        String roleName = user.getRole() != null ? user.getRole().getName() : "USER";

        return new AuthResponse(token, user.getEmail(), user.getFirstname(), roleName);
    }
}