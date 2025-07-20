package com.rentease.rentease.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "tenants")
@Data
public class Tenant {

    @Id
    private String id;

    private String username;
    private String password;
    private String email;
    private String name;

    @DBRef
    private List<PropertyDel> bookedProperties = new ArrayList<>();
}
