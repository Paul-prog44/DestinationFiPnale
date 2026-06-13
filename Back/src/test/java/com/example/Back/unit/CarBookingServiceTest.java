package com.example.Back.unit;

import com.example.Back.dto.CarBookingRequest;
import com.example.Back.dto.CarBookingResponse;
import com.example.Back.model.*;
import com.example.Back.repository.*;
import com.example.Back.service.CarBookingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarBookingServiceTest {

    @Mock private CarBookingRepository carBookingRepository;
    @Mock private CarRepository carRepository;
    @Mock private UserRepository userRepository;
    @Mock private BookingRepository bookingRepository;

    @InjectMocks
    private CarBookingService carBookingService;

    private Car mockCar;
    private User mockUser;
    private City mockCity;

    @BeforeEach
    void setUp() {
        mockCity = City.builder().id(1).name("Paris").country("France").build();

        mockCar = Car.builder()
                .id(1)
                .brand("Renault")
                .model("Clio")
                .pricePerDay(new BigDecimal("50.00"))
                .city(mockCity)
                .build();

        mockUser = new User();
        mockUser.setId(1);
        mockUser.setEmail("kenza@test.com");
        mockUser.setFirstname("Kenza");
    }

    // ── CRÉER RÉSERVATION ──────────────────────────────────────

    @Test
    @DisplayName("Créer réservation : succès")
    void createBooking_success() {
        CarBookingRequest request = new CarBookingRequest();
        request.setCarId(1);
        request.setStartDate(LocalDate.now().plusDays(1));
        request.setEndDate(LocalDate.now().plusDays(6));

        when(carRepository.findById(1)).thenReturn(Optional.of(mockCar));
        when(userRepository.findByEmail("kenza@test.com")).thenReturn(Optional.of(mockUser));
        when(carBookingRepository.isCarAlreadyBooked(any(), any(), any())).thenReturn(false);
        when(carBookingRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(bookingRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        CarBookingResponse response = carBookingService.createBooking(request, "kenza@test.com");

        assertThat(response.getCarBrand()).isEqualTo("Renault");
        assertThat(response.getCarModel()).isEqualTo("Clio");
        assertThat(response.getNumberOfDays()).isEqualTo(5);
        assertThat(response.getPrice()).isEqualByComparingTo("250.00");
        assertThat(response.getStatus()).isEqualTo("PENDING");
    }

    @Test
    @DisplayName("Créer réservation : échec si voiture déjà réservée")
    void createBooking_carAlreadyBooked() {
        CarBookingRequest request = new CarBookingRequest();
        request.setCarId(1);
        request.setStartDate(LocalDate.now().plusDays(1));
        request.setEndDate(LocalDate.now().plusDays(5));

        when(carRepository.findById(1)).thenReturn(Optional.of(mockCar));
        when(userRepository.findByEmail("kenza@test.com")).thenReturn(Optional.of(mockUser));
        when(carBookingRepository.isCarAlreadyBooked(any(), any(), any())).thenReturn(true);

        assertThatThrownBy(() -> carBookingService.createBooking(request, "kenza@test.com"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("déjà réservée");
    }

    @Test
    @DisplayName("Créer réservation : échec si date début dans le passé")
    void createBooking_startDateInPast() {
        CarBookingRequest request = new CarBookingRequest();
        request.setCarId(1);
        request.setStartDate(LocalDate.now().minusDays(1));
        request.setEndDate(LocalDate.now().plusDays(3));

        when(carRepository.findById(1)).thenReturn(Optional.of(mockCar));
        when(userRepository.findByEmail("kenza@test.com")).thenReturn(Optional.of(mockUser));

        assertThatThrownBy(() -> carBookingService.createBooking(request, "kenza@test.com"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("passé");
    }

    @Test
    @DisplayName("Créer réservation : échec si date début après date fin")
    void createBooking_startAfterEnd() {
        CarBookingRequest request = new CarBookingRequest();
        request.setCarId(1);
        request.setStartDate(LocalDate.now().plusDays(5));
        request.setEndDate(LocalDate.now().plusDays(2));

        when(carRepository.findById(1)).thenReturn(Optional.of(mockCar));
        when(userRepository.findByEmail("kenza@test.com")).thenReturn(Optional.of(mockUser));

        assertThatThrownBy(() -> carBookingService.createBooking(request, "kenza@test.com"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("avant");
    }

    @Test
    @DisplayName("Créer réservation : échec si voiture introuvable")
    void createBooking_carNotFound() {
        CarBookingRequest request = new CarBookingRequest();
        request.setCarId(99);
        request.setStartDate(LocalDate.now().plusDays(1));
        request.setEndDate(LocalDate.now().plusDays(5));

        when(carRepository.findById(99)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> carBookingService.createBooking(request, "kenza@test.com"))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("introuvable");
    }

    // ── MES RÉSERVATIONS ───────────────────────────────────────

    @Test
    @DisplayName("Mes réservations : retourne liste vide si aucune résa")
    void getMyBookings_empty() {
        when(userRepository.findByEmail("kenza@test.com")).thenReturn(Optional.of(mockUser));
        when(bookingRepository.findByUserId(1)).thenReturn(List.of());

        List<CarBookingResponse> result = carBookingService.getMyBookings("kenza@test.com");

        assertThat(result).isEmpty();
    }

    // ── ANNULATION ─────────────────────────────────────────────

    @Test
    @DisplayName("Annuler : échec si réservation n'appartient pas à l'utilisateur")
    void cancelBooking_notOwner() {
        CarBooking carBooking = CarBooking.builder()
                .id(1)
                .car(mockCar)
                .startDate(LocalDate.now().plusDays(1))
                .endDate(LocalDate.now().plusDays(5))
                .status("PENDING")
                .build();

        User otherUser = new User();
        otherUser.setId(2);
        otherUser.setEmail("other@test.com");

        Booking booking = Booking.builder()
                .id(1)
                .user(otherUser)
                .carBooking(carBooking)
                .status("PENDING")
                .build();

        when(carBookingRepository.findById(1)).thenReturn(Optional.of(carBooking));
        when(bookingRepository.findAll()).thenReturn(List.of(booking));

        assertThatThrownBy(() -> carBookingService.cancelBooking(1, "kenza@test.com"))
                .isInstanceOf(RuntimeException.class);
    }
}