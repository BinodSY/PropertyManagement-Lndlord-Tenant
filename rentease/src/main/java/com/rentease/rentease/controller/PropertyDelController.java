package com.rentease.rentease.controller;

import com.rentease.rentease.entity.PropertyDel;
// import com.rentease.rentease.entity.Tenant;

import com.rentease.rentease.entity.User;
import com.rentease.rentease.service.UserService;

import com.rentease.rentease.service.PropertyDelService;


import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

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
    @GetMapping("/user-properties")
    public ResponseEntity<List<PropertyDel>> getAllPropertiesByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Get the username from the authentication object
        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().build(); // Return 400 Bad Request if username is not available
        }

        return userService.findByUsername(username)
                .map(user -> ResponseEntity.ok(user.getProperties()))
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/available")
    public List<PropertyDel> getAvailableProperties() {
        return propertyDelService.getAvailableProperties();
    }

    // POST: Save a new property and associate it with a user
    // @PostMapping()
    // public ResponseEntity<PropertyDel> saveProperty(@RequestBody PropertyDel property) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     Optional<User> userOptional = userService.findByUsername(authentication.getName());

    //     if (userOptional.isEmpty()) {
    //         return ResponseEntity.notFound().build(); // Return 404 if user not found
    //     }

    //     // Extract username from authentication
    //     String username = authentication.getName();
    //     // Set the owner on the property for data integrity
    //     property.setHouseOwner(username);
    //     // 1. First, save the property to get a managed entity with an ID
    //     PropertyDel savedProperty = propertyDelService.saveProperty(property);
    //     // 2. Then, associate the saved property with the user
    //     User user = userOptional.get();
    //     user.getProperties().add(savedProperty);
    //     userService.createUser(user); // This updates the user with the new property reference

    //     // 3. Return 201 Created with the new property in the body
    //     return ResponseEntity.status(HttpStatus.CREATED).body(savedProperty);
    // }

    // POST: Save a new property and associate it with a landlord user
    @PostMapping("/properties-listing")
    public ResponseEntity<PropertyDel> saveProperty(@RequestBody PropertyDel property) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();

    if (userService.findByUsername(username).isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    PropertyDel savedProperty = propertyDelService.savePropertyAndAssignToUser(username, property);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedProperty);
    }
    
    // POST: Book a property for a tenant
   @PostMapping("/book-property")
    public ResponseEntity<String> bookProperty(@RequestBody PropertyDel property) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String tenantName = authentication.getName();

        if (tenantName == null || tenantName.isEmpty()) {
            return ResponseEntity.badRequest().build(); // Return 400 Bad Request if username is not available
        }
        

        String updatedProperty = propertyDelService.assignBookedPropertyToTenant(tenantName, property.getId());
        return ResponseEntity.ok(updatedProperty);
    }
   


    @PutMapping()
    public ResponseEntity<PropertyDel> updateProperty(@RequestBody PropertyDel property) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); // Get the username from the authentication object
        if (username == null || username.isEmpty()) {
            return ResponseEntity.badRequest().build(); // Return 400 Bad Request if username is not available
        }

        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.notFound().build(); // User not found
        }
    
        PropertyDel updatedProperty = propertyDelService.savePropertyAndAssignToUser(username, property); // Use save for update
        return ResponseEntity.ok(updatedProperty); // Return 200 OK with the updated property
    }


 

    // DELETE: Delete all properties for a given user
    @DeleteMapping("/delete-properties")
    public ResponseEntity<String> deleteAllPropertiesByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username=authentication.getName();
        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User '" + username + "' not found.");
        }
        User user = userOptional.get();

        // Delete all properties associated with the user
        user.getProperties().forEach(property -> propertyDelService.deletePropertyIfExists(property.getId()));
        user.getProperties().clear(); // Clear the list of properties for the user
        userService.createUser(user); // Update the user

        return ResponseEntity.ok("All properties for user '" + username + "' were deleted successfully.");
    }

    // @GetMapping("/search")
    // public List<PropertyDel> searchProperties(
    //     @RequestParam(required = false) String Id,
    //     @RequestParam(required = false) String houseOwner,
    //     @RequestParam(required = false) String address,
    //     @RequestParam(required = false) Double minRentAmount,
    //     @RequestParam(required = false) Double maxRentAmount,
    //     @RequestParam(required = false) Integer bedRooms,
    //     @RequestParam(required = false) Integer bathRooms) {
    //     // The service layer contains a placeholder for search logic.
    //     // This should be implemented for full functionality.
    //     return propertyDelService.searchProperties(
    //         Id, houseOwner, address, minRentAmount, maxRentAmount, bedRooms, bathRooms
    //     );
    // }


}
