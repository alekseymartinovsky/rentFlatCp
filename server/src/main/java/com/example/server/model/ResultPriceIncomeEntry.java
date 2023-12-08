package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class ResultPriceIncomeEntry {
    private String date;
    private Double resPrice;

}
