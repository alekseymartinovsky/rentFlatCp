package com.example.server.dto;

import lombok.Data;

@Data
public class ReservationDto {
    private String id;
    private Long flatId;
    private Long tenantId;
    private Long landlordId;
    private String startDate;
    private String endDate;

}
