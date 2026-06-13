package com.example.Back.unit;

import com.example.Back.dto.AuthResponse;
import com.example.Back.dto.LoginRequest;
import com.example.Back.dto.RegisterRequest;
import com.example.Back.exception.EmailAlreadyUsedException;
import com.example.Back.model.Role;
import com.example.Back.model.User;
import com.example.Back.repository.RoleRepository;
import com.example.Back.repository.UserRepository;
import com.example.Back.security.JwtTokenProvider;
import com.example.Back.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock private UserRepository userRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    private User mockUser;
    private Role mockRole;

    @BeforeEach
    void setUp() {
        mockRole = Role.builder().id(1).name("USER").build();
        mockUser = new User();
        mockUser.setId(1);
        mockUser.setFirstname("Kenza");
        mockUser.setLastname("Test");
        mockUser.setEmail("kenza@test.com");
        mockUser.setPassword("hashedPassword");
        mockUser.setRole(mockRole);
    }

    // ── REGISTER ──────────────────────────────────────────────

    @Test
    @DisplayName("Register : succès avec un nouvel email")
    void register_success() {
        RegisterRequest request = new RegisterRequest();
        request.setFirstname("Kenza");
        request.setLastname("Test");
        request.setEmail("kenza@test.com");
        request.setPassword("password123");
        request.setDateOfBirth(LocalDate.of(2000, 1, 1));

        when(userRepository.existsByEmail("kenza@test.com")).thenReturn(false);
        when(roleRepository.findByName("USER")).thenReturn(Optional.of(mockRole));
        when(passwordEncoder.encode("password123")).thenReturn("hashedPassword");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);
        when(tokenProvider.generateToken("kenza@test.com")).thenReturn("jwt-token");

        AuthResponse response = authService.register(request);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        assertThat(response.getEmail()).isEqualTo("kenza@test.com");
        assertThat(response.getFirstname()).isEqualTo("Kenza");
        assertThat(response.getRole()).isEqualTo("USER");
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("Register : échec si email déjà utilisé")
    void register_emailAlreadyUsed() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("kenza@test.com");

        when(userRepository.existsByEmail("kenza@test.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(EmailAlreadyUsedException.class);

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("Register : crée le rôle USER s'il n'existe pas")
    void register_createsRoleIfAbsent() {
        RegisterRequest request = new RegisterRequest();
        request.setFirstname("Kenza");
        request.setLastname("Test");
        request.setEmail("kenza@test.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(roleRepository.findByName("USER")).thenReturn(Optional.empty());
        when(roleRepository.save(any(Role.class))).thenReturn(mockRole);
        when(userRepository.save(any(User.class))).thenReturn(mockUser);
        when(tokenProvider.generateToken(any())).thenReturn("jwt-token");

        authService.register(request);

        verify(roleRepository).save(any(Role.class));
    }

    // ── LOGIN ──────────────────────────────────────────────────

    @Test
    @DisplayName("Login : succès avec les bons credentials")
    void login_success() {
        LoginRequest request = new LoginRequest();
        request.setEmail("kenza@test.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("kenza@test.com")).thenReturn(Optional.of(mockUser));
        when(tokenProvider.generateToken("kenza@test.com")).thenReturn("jwt-token");

        AuthResponse response = authService.login(request);

        assertThat(response.getToken()).isEqualTo("jwt-token");
        assertThat(response.getEmail()).isEqualTo("kenza@test.com");
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    @DisplayName("Login : échec avec mauvais mot de passe")
    void login_badCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("kenza@test.com");
        request.setPassword("mauvaismdp");

        doThrow(new BadCredentialsException("Bad credentials"))
                .when(authenticationManager).authenticate(any());

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    @DisplayName("Login : rôle USER par défaut si pas de rôle assigné")
    void login_defaultRoleIfNull() {
        mockUser.setRole(null);
        LoginRequest request = new LoginRequest();
        request.setEmail("kenza@test.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("kenza@test.com")).thenReturn(Optional.of(mockUser));
        when(tokenProvider.generateToken(any())).thenReturn("jwt-token");

        AuthResponse response = authService.login(request);

        assertThat(response.getRole()).isEqualTo("USER");
    }
}