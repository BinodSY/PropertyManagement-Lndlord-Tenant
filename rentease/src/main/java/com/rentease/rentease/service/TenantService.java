package com.rentease.rentease.service;


import com.rentease.rentease.entity.Tenant;

import com.rentease.rentease.repository.TenantRepository;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TenantService {
    @Autowired
    private TenantRepository tenantRepository;
  

    public Tenant createTenant(Tenant tenant) {
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

    public Tenant updateOrReplaceTenant(String id, Tenant tenant) {
        tenant.setId(id); // ensure the tenant ID matches the path variable
        return tenantRepository.save(tenant); // save() will update if exists, insert if not
    }

    public void deleteTenant(String id) {
        tenantRepository.deleteById(id);
    }
}