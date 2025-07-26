package com.rentease.rentease.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import com.mongodb.lang.NonNull;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "tenants")
@Data
public class Tenant {

    @Id
    private String id;
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    private String email;
    @NonNull
    private String name;
    private String role = "ROLE_TENANT"; // Default role for tenants

    @DBRef
    private List<PropertyDel> bookedProperties = new ArrayList<>();
}
