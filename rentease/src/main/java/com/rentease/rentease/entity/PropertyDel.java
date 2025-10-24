package com.rentease.rentease.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "properties_details")
@Data
public class PropertyDel {
    @Id
    private String id;
    private String houseOwner;
    private String title;
    private String address;
    private String city;
    private Double rentAmount;
    private int deposit;
    private double area;
    private int bedRooms;
    private int bathRooms;

    private boolean available;
    private String bookedByTenantId;// New field to track which tenant booked the property
    private List<String> imageUrls = new ArrayList<>(); // List to hold multiple image
    
}
