package com.rentease.rentease.controller;


import com.rentease.rentease.entity.User;
import com.rentease.rentease.service.PropertyDelService;
import com.rentease.rentease.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequestMapping("/landlord")
public class landlordController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private PropertyDelService propertyDelService;

    
  
    // @GetMapping("/myUsers")
    // public ResponseEntity<List<User>> getAllUsers() {
    //     List<User> users = userService.getAllUsers();
    //     return ResponseEntity.ok(users);
    // }


    // @GetMapping("/{username}")
    // public ResponseEntity<User> findByUsername(@PathVariable String username) {
    //     return userService.findByUsername(username)
    //             .map(ResponseEntity::ok)
    //             .orElse(ResponseEntity.notFound().build());
    // }

    
    
    // @PostMapping("/create")
    // public ResponseEntity<User> UserCreate(@RequestBody User user) {
    //     User savedUser = userService.createUser(user);
    //     return ResponseEntity.ok(savedUser);
    // }
    
    @PutMapping
    public ResponseEntity<User> updatePassword(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> existingUser = userService.findByUsername(authentication.getName());
        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();
            userToUpdate.setPassword(user.getPassword());
            User updatedUser = userService.createUser(userToUpdate); // Using createUser to save the updated user
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    

   

    @DeleteMapping("/delete-user")
    public ResponseEntity<String> deleteUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> user = userService.findByUsername(authentication.getName());
        if (user.isPresent()) {
            userService.deleteUser(user.get().getUsername());
            return ResponseEntity.ok("User deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Endpoint to delete the user and all associated properties
    
    @DeleteMapping("/delete-my-account")
    public ResponseEntity<String> deleteMyAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<User> userOptional = userService.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Delete all properties associated with the user
            user.getProperties().forEach(property -> propertyDelService.deletePropertyIfExists(property.getId()));
            user.getProperties().clear(); // Clear the list of properties for the user
            userService.deleteUser(username); // Delete the user account
            return ResponseEntity.ok("User and associated properties deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    
    

    



}
