package com.example.server.service;

import com.example.server.dto.RentalIncomeResultDTO;
import com.example.server.entity.ManagerEntity;
import com.example.server.entity.RentFlatEntity;
import com.example.server.entity.ReservationEntity;
import com.example.server.model.RentFlat;
import com.example.server.model.ResultPriceIncomeEntry;
import com.example.server.repository.ManagerRepository;
import com.example.server.repository.RentFlatRepository;
import com.example.server.repository.ReservationRepository;
import com.example.server.utils.MonthMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;


import java.time.format.DateTimeFormatter;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class RentalResultService {

    @Autowired
    ManagerRepository managerRepository;

    @Autowired
    RentFlatRepository rentFlatRepository;

    @Autowired
    ReservationRepository reservationRepository;

    public RentalIncomeResultDTO getResultForManager(String token) throws Exception {
        try {
            ManagerEntity manager = managerRepository.findOneByToken(token);
            List<RentFlatEntity> flats = rentFlatRepository.findAllByManagerEntity(manager);

            List<Pair<RentFlat, List<ResultPriceIncomeEntry>>> res = new ArrayList<>();
            Double totalPrice = 0.0;

            for(RentFlatEntity flat: flats) {
                List<ReservationEntity> reservations = reservationRepository.getByFlatId(flat.getId());

                totalPrice += reservations.stream()
                        .mapToDouble(reservation -> {
                            LocalDate startDate = reservation.getStartDate().toLocalDate();
                            LocalDate endDate = reservation.getEndDate().toLocalDate();
                            long daysBetween = ChronoUnit.DAYS.between(startDate, endDate) + 1;
                            return daysBetween * reservation.getDayPrice();
                        }).sum();

                        Map<String, Double> monthlySumMap = new HashMap<>();

                for (ReservationEntity reservation : reservations) {
                    String monthYear = MonthMapper.getMonthName(reservation.getStartDate().getMonth() + 1);
                    monthYear += " " + (reservation.getStartDate().getYear() + 1900);
                    monthlySumMap.put(monthYear, monthlySumMap.getOrDefault(monthYear, 0.0) + reservation.getDayPrice());
                }

                List<ResultPriceIncomeEntry> result = new ArrayList<>();
                for (Map.Entry<String, Double> entry : monthlySumMap.entrySet()) {
                    result.add(new ResultPriceIncomeEntry(entry.getKey(), entry.getValue()));
                }

                Pair<RentFlat, List<ResultPriceIncomeEntry>> pair = Pair.of(RentFlat.toModel(flat), result);

                res.add(pair);
            }

            RentalIncomeResultDTO rentalIncomeResult = new RentalIncomeResultDTO();
            rentalIncomeResult.setMonthData(res);
            rentalIncomeResult.setTotalPrice(totalPrice);


            return rentalIncomeResult;
        } catch (Exception ex){
            throw new Exception("Проблема");
        }
    }
}
