package com.example.server.http.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class HandlerError {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Exception> sendError(Exception ex) {
        return new ResponseEntity<>(ex, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
