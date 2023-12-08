package com.example.server.dto;


import com.example.server.entity.RentFlatEntity;
import com.example.server.model.RentFlat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ManagerDto {
    private Long id;
    private String login;
    private String phone;
    private String email;

    public ManagerDto(){}
}
