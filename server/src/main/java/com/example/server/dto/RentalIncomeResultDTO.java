package com.example.server.dto;


import com.example.server.entity.RentFlatEntity;
import com.example.server.model.RentFlat;
import com.example.server.model.ResultPriceIncomeEntry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.util.Pair;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RentalIncomeResultDTO {
    List<Pair<RentFlat, List<ResultPriceIncomeEntry>>> monthData;
    Double totalPrice;
}
