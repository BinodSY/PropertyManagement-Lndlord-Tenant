package com.rentease.rentease.service;


import com.rentease.rentease.entity.Tenant;

import com.rentease.rentease.repository.TenantRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TenantService {
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Tenant createTenant(Tenant tenant) {
        tenant.setPassword(passwordEncoder.encode(tenant.getPassword()));
        return tenantRepository.save(tenant);
    }

    public List<Tenant> createTenants(List<Tenant> tenants) {
        return tenantRepository.saveAll(tenants);
    }

   
    public List<Tenant> getAllTenants() {
        return tenantRepository.findAll();
    }
    public Optional<Tenant> getUsernamTenante(String username) {
        return tenantRepository.findByUsername(username);
    }


    public Optional<Tenant> getTenantById(String id) {
        return tenantRepository.findById(id);
    }

    public Tenant updateTenant(String id, Tenant tenantDetails) {
        Tenant tenant = tenantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tenant not found with id: " + id));
        
        tenant.setUsername(tenantDetails.getUsername());
        tenant.setPassword(passwordEncoder.encode(tenantDetails.getPassword()));
        tenant.setEmail(tenantDetails.getEmail());
        // Add other fields as necessary

        return tenantRepository.save(tenant);
    }

    public void deleteTenant(String id) {
        tenantRepository.deleteById(id);
    }
}