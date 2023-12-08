package com.example.server.model;

import com.example.server.Amenities.AmenitiesName;
import com.example.server.Amenities.AmenitiesService;
import com.example.server.entity.FlatImageEntity;
import com.example.server.entity.RentFlatEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class RentFlat {
    private Long id;
    private FlatInfo flatInfo;
    private List<String> images;
    private Boolean longTermRental;
    private List<AmenitiesName> amenities;
    private Manager manager;
    private Double avgRate;

    public static RentFlat toModel(RentFlatEntity rentFlatEntity){
        RentFlat rentFlat = new RentFlat();
        rentFlat.setId(rentFlatEntity.getId());
        rentFlat.setFlatInfo(FlatInfo.toModel(rentFlatEntity.getFlatInfoEntity()));
        rentFlat.setAmenities(AmenitiesService.createTemplateModel());
        List<String> imagesPath = new ArrayList<>();
        for(FlatImageEntity image : rentFlatEntity.getFlatImageEntities()) {
            imagesPath.add(image.getName());
        }
        rentFlat.setImages(imagesPath);
        rentFlat.setLongTermRental(rentFlatEntity.getLongTermRental());
        rentFlat.setManager(Manager.toModel(rentFlatEntity.getManagerEntity()));
        rentFlat.setAvgRate(rentFlatEntity.getAvgRate());
        return rentFlat;
    }

    public String getAddress() {
        return flatInfo.getCity() + ", " + flatInfo.getStreet() + ", " + flatInfo.getHouse() + ". " + flatInfo.getFlat();
    }


}
