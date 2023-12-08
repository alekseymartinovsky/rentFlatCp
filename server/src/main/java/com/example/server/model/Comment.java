package com.example.server.model;

import com.example.server.entity.CommentEntity;
import com.example.server.repository.RentFlatRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Comment {
    private Long id;
    private String text;
    private Integer rate;
    private Manager user;
    private RentFlat flat;

    public Comment(){};
    public static Comment toModel(CommentEntity commentEntity) {
        return new Comment(commentEntity.getId(), commentEntity.getText(), commentEntity.getRate(), Manager.toModel(commentEntity.getUser()), RentFlat.toModel(commentEntity.getFlat()));
    }
}
