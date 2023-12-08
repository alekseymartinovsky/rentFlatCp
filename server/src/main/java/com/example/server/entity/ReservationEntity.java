package com.example.server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Getter
@Setter
@Table(name = "reservation")
public class ReservationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String Id;

    private Long tenantId;
    private Long landlordId;
    private Long flatId;

    private Date startDate;
    private Date endDate;

    private Double dayPrice;

    public ReservationEntity(){}
}
