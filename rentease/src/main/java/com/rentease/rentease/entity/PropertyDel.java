package com.rentease.rentease.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "properties_details")
@Data
public class PropertyDel {

    @Id
    private String Id; // Changed from bookingId to houseId for MongoRepository compatibility
    private String houseOwner;
    private String address;
    private double rentAmount;
    private int bedRooms;
    private int bathRooms;
    private boolean available;
    
}