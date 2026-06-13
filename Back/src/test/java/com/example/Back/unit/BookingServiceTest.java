package com.example.Back.unit;

import com.example.Back.dto.BookingDto;
import com.example.Back.dto.BookingSearchByUserIdResponse;
import com.example.Back.model.*;
import com.example.Back.repository.*;
import com.example.Back.service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock private BookingRepository bookingRepository;
    @Mock private UserRepository userRepository;
    @Mock private FlightBookingRepository flightBookingRepository;
    @Mock private RoomBookingRepository roomBookingRepository;
    @Mock private RoomRepository roomRepository;

    @InjectMocks
    private BookingService bookingService;

    private User mockUser;
    private Booking mockBooking;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(1);
        mockUser.setEmail("kenza@test.com");

        mockBooking = Booking.builder()
                .id(1)
                .user(mockUser)
                .createdAt(LocalDateTime.now())
                .status("CONFIRMED")
                .build();
    }

    @Test
    @DisplayName("findByUserId : retourne les réservations d'un utilisateur")
    void findByUserId_success() {
        when(bookingRepository.findByUserId(1)).thenReturn(List.of(mockBooking));

        BookingSearchByUserIdResponse response = bookingService.findByUserId(1);

        assertThat(response.getBooking()).hasSize(1);
        assertThat(response.getBooking().get(0).getId()).isEqualTo(1);
        assertThat(response.getBooking().get(0).getStatus()).isEqualTo("CONFIRMED");
    }

    @Test
    @DisplayName("findByUserId : lève exception si aucune réservation")
    void findByUserId_notFound() {
        when(bookingRepository.findByUserId(99)).thenReturn(List.of());

        assertThatThrownBy(() -> bookingService.findByUserId(99))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    @DisplayName("get : retourne un booking par son id")
    void get_success() {
        when(bookingRepository.findById(1)).thenReturn(java.util.Optional.of(mockBooking));

        BookingDto dto = bookingService.get(1);

        assertThat(dto.getId()).isEqualTo(1);
        assertThat(dto.getUserId()).isEqualTo(1);
        assertThat(dto.getStatus()).isEqualTo("CONFIRMED");
    }

    @Test
    @DisplayName("get : lève exception si booking introuvable")
    void get_notFound() {
        when(bookingRepository.findById(99)).thenReturn(java.util.Optional.empty());

        assertThatThrownBy(() -> bookingService.get(99))
                .isInstanceOf(EntityNotFoundException.class);
    }
}