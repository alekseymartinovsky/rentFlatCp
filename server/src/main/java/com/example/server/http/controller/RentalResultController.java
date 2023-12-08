package com.example.server.http.controller;

import com.example.server.service.RentalResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rentalResult")
@CrossOrigin("*")
public class RentalResultController {

    @Autowired
    RentalResultService rentalResultService;

    @GetMapping
    public ResponseEntity getRentalResult(@RequestHeader String token) throws Exception {
            return ResponseEntity.ok().body(rentalResultService.getResultForManager(token));
    }
}
