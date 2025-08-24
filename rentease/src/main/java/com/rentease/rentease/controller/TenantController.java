package com.rentease.rentease.controller;
import java.util.*;


import com.rentease.rentease.entity.Tenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentease.rentease.service.TenantService;



@RestController
@RequestMapping("/tenant")
public class TenantController {


    @Autowired
    private TenantService tenantService;
    
    @GetMapping("/test")
    public String test(){
        return "Hello from TenantController";
     }  
    
    
    
    // @GetMapping("/all")
    // public ResponseEntity<List<Tenant>> getAllTenants() {
    //     return ResponseEntity.ok(tenantService.getAllTenants());
    // }


    
    @PostMapping("/create-tenant")
    public Tenant createTenant(@RequestBody Tenant tenant) {
        return tenantService.createTenant(tenant);
    }
    @PutMapping("/update-tenant")
    public ResponseEntity<Tenant> updateTenant(@RequestBody Tenant tenant) {    
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Tenant> existingTenant = tenantService.getUsernamTenante(authentication.getName());
        if (existingTenant.isPresent()) {
            Tenant updatedTenant = tenantService.updateTenant(existingTenant.get().getId(), tenant);
            return ResponseEntity.ok(updatedTenant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
   
    
    @DeleteMapping
    public ResponseEntity<String> deleteTenant() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Tenant> tenant = tenantService.getUsernamTenante(authentication.getName());
        if (tenant.isPresent()) {
            tenantService.deleteTenant(tenant.get().getId());
            return ResponseEntity.ok("Tenant deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   


}
