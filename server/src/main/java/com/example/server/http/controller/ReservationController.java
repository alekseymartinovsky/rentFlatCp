package com.example.server.http.controller;

import com.example.server.dto.ReservationDto;
import com.example.server.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/reservation")
@CrossOrigin("*")
public class ReservationController {

    @Autowired
    ReservationService reservationService;

    @PostMapping
    public ResponseEntity addReservation(@RequestBody ReservationDto reservationDto) {
        try{
            return ResponseEntity.ok().body(reservationService.addReservation(reservationDto));
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return ResponseEntity.badRequest().body("Не удалось зарезервировать даты");
        }
    }

    @GetMapping("/getByFlatId")
    public ResponseEntity getReservationByFlatId(@RequestParam Long id) {
        try{
            return ResponseEntity.ok().body(reservationService.getReservationByFlatId(id));
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return ResponseEntity.badRequest().body("Не удалось зарезервировать даты");
        }
    }

    @PostMapping("/getApartmentReservations")
    public ResponseEntity getReservationByUser(@RequestHeader String token) {
        try{
            return ResponseEntity.ok().body(reservationService.getReservationByUser(token));
        } catch (Exception ex){
            System.out.println(ex.getMessage());
            return ResponseEntity.badRequest().body("Не удалось загрузить информацию о бронированиях");
        }
    }
}
