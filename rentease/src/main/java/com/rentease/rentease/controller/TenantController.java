package com.rentease.rentease.controller;
import java.util.List;

import com.rentease.rentease.entity.Tenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentease.rentease.service.TenantService;

@RestController
@RequestMapping("/tenants")
public class TenantController {


    @Autowired

    private TenantService tenantService;
    

    @GetMapping
    public List<Tenant> getAllTenants() {
        return tenantService.getAllTenants();
    }


    @GetMapping("/{username}")
    public Tenant getTenantByUsername(@PathVariable String username) {
        return tenantService.getUsernamTenante(username)
                .orElseThrow(() -> new RuntimeException("Tenant not found with username: " + username));
    }
    @PostMapping
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return tenantService.createTenant(tenant);
    }
    @DeleteMapping("/{id}")
    public void deleteTenant(@PathVariable String id) {
        tenantService.deleteTenant(id);
    }

   


}
