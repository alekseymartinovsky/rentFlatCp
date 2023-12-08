package com.example.server.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "manager")
public class ManagerEntity extends UserEntity {
    private String phone;
    private String email;

    @OneToMany
    private List<CommentEntity> comments;

    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(
            name = "manager_favorite_flat",
            joinColumns = @JoinColumn(name = "manager_id"),
            inverseJoinColumns = @JoinColumn(name = "rent_flat_id")
    )
    private List<RentFlatEntity> favoriteRentFlat;
}
