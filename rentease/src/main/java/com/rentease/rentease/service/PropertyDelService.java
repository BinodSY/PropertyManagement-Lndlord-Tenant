package com.rentease.rentease.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.rentease.rentease.entity.PropertyDel;
import com.rentease.rentease.repository.PropertyDelRepo;


@Service
public class PropertyDelService {

    @Autowired
    private PropertyDelRepo propertyDelRepo;

    public List<PropertyDel> getAllProperties() {
        return propertyDelRepo.findAll();
    }

    public PropertyDel saveProperty(PropertyDel property) {
        return propertyDelRepo.save(property);
    }
    public PropertyDel updateProperty(PropertyDel property) {
        return propertyDelRepo.save(property);
    }
    // Additional methods for delete, find by ID, etc. can be added here
    // For example, you can add a method to delete a property by ID:
    
    public boolean deletePropertyIfExists(String Id) {
        if (propertyDelRepo.existsById(Id)) {
            propertyDelRepo.deleteById(Id);
            return true;
        }
        return false;
    }

    public PropertyDel findById(String Id) {
        return propertyDelRepo.findById(Id).orElse(null);
    }

    public List<PropertyDel> searchProperties(
        String Id,
        String houseOwner,
        String address,
        Double minRentAmount,
        Double maxRentAmount,
        Integer bedRooms,
        Integer bathRooms) {
        
        // Implement search logic based on the provided parameters
        // This is a placeholder implementation; you can customize it as needed
        return propertyDelRepo.findAll(); // Replace with actual search logic
    }

}
