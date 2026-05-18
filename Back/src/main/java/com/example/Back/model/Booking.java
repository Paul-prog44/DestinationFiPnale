package com.example.Back.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "flight_booking_id")
    private FlightBooking flightBooking;

    @OneToOne
    @JoinColumn(name = "room_booking_id")
    private RoomBooking roomBooking;

    @OneToOne
    @JoinColumn(name = "car_booking_id")
    private CarBooking carBooking;

    private LocalDateTime createdAt;

    @Column(length = 20)
    private String status;
}