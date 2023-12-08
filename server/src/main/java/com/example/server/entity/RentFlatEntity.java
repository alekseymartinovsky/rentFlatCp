package com.example.server.entity;

import com.example.server.Amenities.AmenitiesName;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "rentFlat")
@JsonIgnoreProperties(ignoreUnknown = true)
public class RentFlatEntity extends FlatEntity {


    private Boolean longTermRental;

    private ArrayList<AmenitiesName> amenities;

    @OneToMany
    private List<CommentEntity> comments;

    private Double avgRate;

    public static RentFlatEntity create(FlatInfoEntity flatInfo, List<FlatImageEntity> images, ManagerEntity manager, ArrayList<AmenitiesName> amenities){
        RentFlatEntity rentFlatEntity = new RentFlatEntity();
        rentFlatEntity.setFlatInfoEntity(flatInfo);
        rentFlatEntity.setFlatImageEntities(images);
        rentFlatEntity.setManagerEntity(manager);
        rentFlatEntity.setAmenities(amenities);
        rentFlatEntity.setAvgRate(-1D);
        return rentFlatEntity;
    }

}
