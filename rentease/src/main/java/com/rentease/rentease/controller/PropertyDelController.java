package com.rentease.rentease.controller;

import com.rentease.rentease.entity.PropertyDel;
import com.rentease.rentease.entity.User;
import com.rentease.rentease.service.UserService;

import com.rentease.rentease.service.PropertyDelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/propertiesDel")
public class PropertyDelController {

    @Autowired
    private PropertyDelService propertyDelService;
    @Autowired
    private UserService userService;

    // GET: Retrieve all property details
    @GetMapping
    public ResponseEntity<List<PropertyDel>> getAllProperties() {
        List<PropertyDel> properties = propertyDelService.getAllProperties();
        return ResponseEntity.ok(properties);
    }
    // GET: Retrieve all property details by username
    @GetMapping("/{username}")
    public ResponseEntity<List<PropertyDel>> getAllPropertiesByUser(@PathVariable String username) {
        return userService.findByUsername(username)
                .map(user -> ResponseEntity.ok(user.getProperties()))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/available")
    public List<PropertyDel> getAvailableProperties() {
        return propertyDelService.getAvailableProperties();
    }

    // POST: Save a new property and associate it with a user
    @PostMapping("/{username}")
    public ResponseEntity<PropertyDel> saveProperty(@RequestBody PropertyDel property, @PathVariable String username) {
        Optional<User> userOptional = userService.findByUsername(username);

        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 if user not found
        }

        // Set the owner on the property for data integrity
        property.setHouseOwner(username);

        // 1. First, save the property to get a managed entity with an ID
        PropertyDel savedProperty = propertyDelService.saveProperty(property);

        // 2. Then, associate the saved property with the user
        User user = userOptional.get();
        user.getProperties().add(savedProperty);
        userService.createUser(user); // This updates the user with the new property reference

        // 3. Return 201 Created with the new property in the body
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProperty);
    }

    @PutMapping("/{username}/{Id}")
    public ResponseEntity<PropertyDel> updateProperty( 
            @PathVariable String username,
            @PathVariable  String Id,
            @RequestBody PropertyDel property) {

        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // User not found
        }
    
        // Check if the property exists and belongs to the user
        PropertyDel existingProperty = propertyDelService.findById(Id);
        if (existingProperty == null || !existingProperty.getHouseOwner().equals(username)) {
            return ResponseEntity.notFound().build(); // Property not found or doesn't belong to the user
        }
    
        // Update the existing property with new details
        property.setId(Id); // Ensure the ID is set from the path variable
        property.setHouseOwner(username); // Ensure the owner remains the same
    
        PropertyDel updatedProperty = propertyDelService.saveProperty(property); // Use save for update
    
        return ResponseEntity.ok(updatedProperty); // Return 200 OK with the updated property
    }


    // DELETE: Delete a property and remove its reference from the owner
    @DeleteMapping("/{username}/{Id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable String username, @PathVariable Optional<String> Id) {
        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // User not found
        }
        User user = userOptional.get();

        if (Id.isPresent()) {
            // Delete a specific property by ID
            String propertyId = Id.get();
            PropertyDel propertyToDelete = propertyDelService.findById(propertyId);

            if (propertyToDelete == null || !propertyToDelete.getHouseOwner().equals(username)) {
                return ResponseEntity.notFound().build(); // Property not found or doesn't belong to the user
            }

            // Remove reference from user's properties
            user.getProperties().removeIf(p -> p.getId().equals(propertyId));
            userService.createUser(user); // Update the user
            // Delete the property itself
            propertyDelService.deletePropertyIfExists(propertyId);
        } else {
            // Delete all properties associated with the user
            user.getProperties().forEach(property -> propertyDelService.deletePropertyIfExists(property.getId()));
            user.getProperties().clear(); // Clear the list of properties for the user
            userService.createUser(user); // Update the user
        }
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }

    @GetMapping("/search")
    public List<PropertyDel> searchProperties(
        @RequestParam(required = false) String Id,
        @RequestParam(required = false) String houseOwner,
        @RequestParam(required = false) String address,
        @RequestParam(required = false) Double minRentAmount,
        @RequestParam(required = false) Double maxRentAmount,
        @RequestParam(required = false) Integer bedRooms,
        @RequestParam(required = false) Integer bathRooms) {
        // The service layer contains a placeholder for search logic.
        // This should be implemented for full functionality.
        return propertyDelService.searchProperties(
            Id, houseOwner, address, minRentAmount, maxRentAmount, bedRooms, bathRooms
        );
    }


}
