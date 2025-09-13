package com.rentease.rentease.controller;
import com.rentease.rentease.entity.PropertyDel;
import com.rentease.rentease.entity.Tenant;
import com.rentease.rentease.entity.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import com.rentease.rentease.service.PropertyDelService;
import com.rentease.rentease.service.UserService;
import com.rentease.rentease.service.TenantService;



@RestController
@RequestMapping("/adminn")
public class AdminController {
    @Autowired
    private TenantService tenantService;
    @Autowired
    private PropertyDelService propertyDelService;
    @Autowired
    private UserService userService;



    @GetMapping("/landlord-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @GetMapping("/tenant-users")
    public ResponseEntity<List<Tenant>> getAllTenants() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }

    
    @PostMapping("/property-create")
    public ResponseEntity<?> propertyCreateAdmin(@RequestBody PropertyDel property){
        propertyDelService.saveProperty(property);

        return ResponseEntity.ok("Property created successfully.");
    }




    @DeleteMapping("/deleteTenant/{username}")
    public String deleteTenant(@PathVariable String username) {
       
       
        return "Tenant with username " + username + " deleted successfully.";
    }

    @DeleteMapping("/deletetenantById/{Id}")
        public String deletetennatById(@PathVariable String Id){
            tenantService.deleteTenant(Id);
            return "tenant deleted";
        }
      @DeleteMapping("/deleteLandlordById/{Id}")
        public String deletelandlordById(@PathVariable String Id){
            userService.deleteUser(Id);
            return "landlord deleted";
        }

    

    
}