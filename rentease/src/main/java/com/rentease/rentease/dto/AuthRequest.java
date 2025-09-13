package com.rentease.rentease.dto;

import io.micrometer.common.lang.NonNull;
import lombok.Data;

@Data
public class AuthRequest {
    @NonNull
    private String email;
    @NonNull
    private String password;
    // getters & setters


}
