package com.example.server.dto;

import com.example.server.model.Manager;
import com.example.server.model.RentFlat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentDTO {
    private Long id;
    private String text;
    private Integer rate;
    private ManagerDto user;

    public CommentDTO(){}
}
