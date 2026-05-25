package com.example.Back.dto;
import lombok.Data;
import java.time.LocalDateTime;
// import jakarta.validation.constraints.*
//https://www.baeldung.com/spring-boot-bean-validation

@Data
public class FlightCreationRequest {
    private Integer companyId;
    // @NotNull(message = "L'heure de départ est obligatoire")
    // @Future(message = "L'heure de départ doit être dans le futur")
    private LocalDateTime deptTime;
    private LocalDateTime arrTime;
    private Integer depCityId;
    private Integer arrCityId;
}
