package com.rentease.rentease.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private final String token;
    private final String email;
    private final String role;
}
