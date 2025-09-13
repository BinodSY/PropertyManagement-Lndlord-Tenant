package com.rentease.rentease.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.rentease.rentease.entity.PropertyDel;
import com.rentease.rentease.entity.Tenant;
import com.rentease.rentease.entity.User;
import com.rentease.rentease.repository.PropertyDelRepo;
import com.rentease.rentease.repository.TenantRepository;


@Service
public class PropertyDelService {

    @Autowired
    private PropertyDelRepo propertyDelRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private TenantRepository tenantRepository;
    // @Autowired
    // private TenantService tenantService;
   

    // GET: Retrieve all property details
    public List<PropertyDel> getAllProperties() {
        return propertyDelRepo.findAll();
    }
    



     // Transactional method to save property and assign it to user with rollback on failure
     // This method ensures that both the property save and user update are atomic
    public PropertyDel savePropertyAndAssignToUser(String username, PropertyDel property) {
    // Step 1: Find user
    User user = userService.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Step 2: Save property
    // property.setHouseOwner(username);
    PropertyDel savedProperty = propertyDelRepo.save(property);
    try {
        // Step 3: Update user
        user.getPropertyIds().add(savedProperty.getId());
        userService.updateAtliting(user);//update the user without encoding the existing password
    } catch (Exception e) {
        // Rollback manually (compensating action)
        propertyDelRepo.delete(savedProperty);
        throw new RuntimeException("Failed to assign property to user", e);
    }
    return savedProperty;
}






    // Transactional method to assign booked property to tenant with rollback on failure
    // This method ensures that both the tenant and property updates are atomic
   public String assignBookedPropertyToTenant(String tenantName, String propertyId) {
    // Step 1: Fetch tenant
    Tenant tenant = tenantRepository.findByUsername(tenantName)
        .orElseThrow(() -> new RuntimeException("Tenant not found with username: " + tenantName));

    // Step 2: Fetch property
    PropertyDel property = propertyDelRepo.findById(propertyId)
        .orElseThrow(() -> new RuntimeException("Property not found"));
    
    if (!property.isAvailable()) {
        throw new RuntimeException("Property is not available for booking");
    }

    // Step 3: Update both sides in memory
    if (!tenant.getBookedPropertyIds().contains(propertyId)) {
        tenant.getBookedPropertyIds().add(propertyId);
    }
    if (!property.getBookedByTenantIds().contains(tenant.getId())) {
        property.getBookedByTenantIds().add(tenant.getId());
    }

    // Mark property unavailable
    property.setAvailable(false);

    try {
        // Step 4: Save both
        tenantRepository.save(tenant); // This line is commented out because updateTenant is called below
        // tenantService.updateTenant(tenant.getId(), tenant); // Corrected to use tenant's ID
        propertyDelRepo.save(property);
    } catch (Exception e) {
        // --- ROLLBACK ---
        // 1. Remove the property from tenant’s bookings
        tenant.getBookedPropertyIds().remove(propertyId);
        tenantRepository.save(tenant);

        // 2. Remove tenant from property bookings & reset availability
        property.getBookedByTenantIds().remove(tenant.getId());
        property.setAvailable(true);
        propertyDelRepo.save(property);

        throw new RuntimeException("Failed to book property, rolled back changes", e);
    }

    return "Booked successful";
}





    // POST: Save a new property
    public PropertyDel saveProperty(PropertyDel property) {
        return propertyDelRepo.save(property);
    }
    // PUT: Update an existing property
    public PropertyDel updateProperty(PropertyDel property) {
        return propertyDelRepo.save(property);
    }
   // GET: Retrieve all available properties
   public List<PropertyDel> getAvailableProperties() {
        return propertyDelRepo.findByAvailable(true);
    }
    // DELETE: Delete a property by ID if it exists
    public boolean deletePropertyIfExists(String Id) {
        if (propertyDelRepo.existsById(Id)) {
            propertyDelRepo.deleteById(Id);
            return true;
        }
        return false;
    }
    // GET: Find a property by ID
    public PropertyDel findById(String Id) {
        return propertyDelRepo.findById(Id).orElse(null);
    }
    // // GET: Search properties based on various criteria
    // public List<PropertyDel> searchProperties(
    //     String Id,
    //     String houseOwner,
    //     String address,
    //     Double minRentAmount,
    //     Double maxRentAmount,
    //     Integer bedRooms,
    //     Integer bathRooms) {
        
    //     // Implement search logic based on the provided parameters
    //     // This is a placeholder implementation; you can customize it as needed
    //     return propertyDelRepo.findAll(); // Replace with actual search logic
    // }

}
