package com.rentease.rentease.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class healthCheck {
private static final String HEALTHY_RESPONSE = "Healthy";

    @GetMapping
    public String checkHealth() {
        return HEALTHY_RESPONSE;
    }
}
