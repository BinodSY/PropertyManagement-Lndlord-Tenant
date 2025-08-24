package com.rentease.rentease.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentease.rentease.entity.PropertyDel;
import com.rentease.rentease.entity.Tenant;
import com.rentease.rentease.entity.User;

import com.rentease.rentease.service.PropertyDelService;
import com.rentease.rentease.service.TenantService;
import com.rentease.rentease.service.UserService;


@RestController
@RequestMapping("/")
public class publicController {
private static final String HEALTHY_RESPONSE = "Healthy";
    @Autowired
    private UserService userService;
    @Autowired
    private PropertyDelService propertyDelService;
     @Autowired
    private TenantService tenantService;

    @GetMapping
    public String checkHealth() {
        return HEALTHY_RESPONSE;
    }

    @GetMapping("/properties")
    public ResponseEntity<List<PropertyDel>> getAllProperties() {
        List<PropertyDel> properties = propertyDelService.getAllProperties();
        return ResponseEntity.ok(properties);
    }
    @GetMapping("/available")
    public List<PropertyDel> getAvailableProperties() {
        return propertyDelService.getAvailableProperties();
    }


    @PostMapping("/create-tenant")
    public ResponseEntity<Tenant> UserCreate(@RequestBody Tenant tenant) {
        tenant = tenantService.createTenant(tenant);
        return ResponseEntity.ok(tenant);
    }
    @PostMapping("/create-landlord")
    public ResponseEntity<User> UserCreate(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }
}
