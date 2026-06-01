package com.example.Back.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "flight_booking")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class FlightBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer nbPassagers;

    @ManyToOne
    @JoinColumn(name = "ob_flight_id")
    private Flight outboundFlight;

    @ManyToOne
    @JoinColumn(name = "ib_flight_id")
    private Flight inboundFlight;

    @Column(length = 20)
    private String status;
}