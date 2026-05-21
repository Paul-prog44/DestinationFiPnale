package com.example.Back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightSearchResponse {
    // Une liste de DTOs simplifiés pour chaque vol trouvé
    private List<FlightDto> flights;
}