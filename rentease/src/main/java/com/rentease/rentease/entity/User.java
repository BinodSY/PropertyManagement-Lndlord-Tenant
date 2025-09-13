package com.rentease.rentease.entity;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import org.springframework.data.mongodb.core.mapping.Document;


import java.util.ArrayList;
import java.util.List;
import io.micrometer.common.lang.NonNull;
import lombok.Data;

@Document(collection = "Landlords")
@Data
public class User {

    @Id
    private String Id;
    @Indexed(unique = true)
    @NonNull
    private String username;
    @NonNull
    private String password;
    @Indexed(unique = true)
    @NonNull
    private String email;
    @NonNull
    private String name;
    private String role = "LANDLORD";
                                                    
    private List<String> propertyIds = new ArrayList<>();
    
    }
                                                                     