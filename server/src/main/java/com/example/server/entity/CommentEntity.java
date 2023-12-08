package com.example.server.entity;

import com.example.server.model.Comment;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import net.minidev.json.annotate.JsonIgnore;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
@Getter
@Setter
@Table(name = "comment")
@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @Min(-1)
    @Max(10)
    private int rate;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private ManagerEntity user;

    @ManyToOne
    @JoinColumn(name = "rent_flat_id")
    private RentFlatEntity flat;
}
