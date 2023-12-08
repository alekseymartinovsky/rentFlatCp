package com.example.server.utils;

import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
public class MonthMapper {

    public static String getMonthName(int monthNumber) {
        Map<Integer, String> monthMap = new HashMap<>();
        monthMap.put(1, "Январь");
        monthMap.put(2, "Февраль");
        monthMap.put(3, "Март");
        monthMap.put(4, "Апрель");
        monthMap.put(5, "Май");
        monthMap.put(6, "Июнь");
        monthMap.put(7, "Июль");
        monthMap.put(8, "Август");
        monthMap.put(9, "Сентябрь");
        monthMap.put(10, "Октябрь");
        monthMap.put(11, "Ноябрь");
        monthMap.put(12, "Декабрь");

        return monthMap.getOrDefault(monthNumber, "Неверный номер месяца");
    }
}