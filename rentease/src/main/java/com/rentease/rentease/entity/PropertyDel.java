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
    private String address;
    private double rentAmount;
    private int bedRooms;
    private int bathRooms;
    private boolean available;
    private List<String> bookedByTenantIds = new ArrayList<>(); // store tenant IDs
}
