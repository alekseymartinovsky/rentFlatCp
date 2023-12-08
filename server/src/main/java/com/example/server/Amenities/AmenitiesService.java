package com.example.server.Amenities;

import java.util.ArrayList;

public class AmenitiesService {
    // TODO написать метод
    static public ArrayList<AmenitiesName> fromJson(String str) {
       ArrayList<AmenitiesName> arr = new ArrayList();
       arr.add(AmenitiesName.coffeeMaker);
       arr.add(AmenitiesName.washingMachine);
       return arr;
    }

    static public ArrayList<AmenitiesName> createTemplateModel() {
        ArrayList<AmenitiesName> arr = new ArrayList();
        arr.add(AmenitiesName.coffeeMaker);
        arr.add(AmenitiesName.washingMachine);
        return arr;
    }

}
