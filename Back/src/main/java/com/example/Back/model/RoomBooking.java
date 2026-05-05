package com.example.Back.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "room_booking")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class RoomBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @Column(length = 20)
    private String status;
}