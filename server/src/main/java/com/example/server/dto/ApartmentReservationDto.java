package com.example.server.dto;

import com.example.server.model.RentFlat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApartmentReservationDto {
    private RentFlat flat;
    private List<Pair<ReservationDto, ManagerDto>> reservationData;
}
