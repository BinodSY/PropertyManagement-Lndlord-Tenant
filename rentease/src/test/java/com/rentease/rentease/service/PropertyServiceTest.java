package com.rentease.rentease.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.rentease.rentease.entity.PropertyDel;
import com.rentease.rentease.repository.PropertyDelRepo;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PropertyServiceTest {
    
    @Mock
    private PropertyDelRepo propertyDelRepo;
    
    @InjectMocks
    private PropertyDelService propertyService;

    private PropertyDel property1;
    private PropertyDel property2;

    @BeforeEach
    void setUp() {
        // Create test properties
        property1 = new PropertyDel();
        property1.setId("1");
        property1.setTitle("Test Apartment 1");
        property1.setAddress("123 Test St");
        property1.setCity("Test City");
        property1.setRentAmount(1000.0);
        property1.setAvailable(true);

        property2 = new PropertyDel();
        property2.setId("2");
        property2.setTitle("Test House 2");
        property2.setAddress("456 Test Ave");
        property2.setCity("Test City");
        property2.setRentAmount(1500.0);
        property2.setAvailable(false);
    }

    @Test
    void getAllProperties_shouldReturnListOfProperties() {
        // Arrange
        List<PropertyDel> expectedProperties = Arrays.asList(property1, property2);
        when(propertyDelRepo.findAll()).thenReturn(expectedProperties);

        // Act
        List<PropertyDel> actualProperties = propertyService.getAllProperties();

        // Assert
        assertNotNull(actualProperties);
        assertEquals(2, actualProperties.size());
        assertEquals(property1.getId(), actualProperties.get(0).getId());
        assertEquals(property2.getId(), actualProperties.get(1).getId());
        assertEquals(property1.getTitle(), actualProperties.get(0).getTitle());
        assertEquals(property2.getTitle(), actualProperties.get(1).getTitle());
        
        // Verify repository method was called
        verify(propertyDelRepo, times(1)).findAll();
    }

    @Test
    void getAllProperties_shouldReturnEmptyList_whenNoProperties() {
        // Arrange
        when(propertyDelRepo.findAll()).thenReturn(Arrays.asList());

        // Act
        List<PropertyDel> actualProperties = propertyService.getAllProperties();

        // Assert
        assertNotNull(actualProperties);
        assertTrue(actualProperties.isEmpty());
        
        // Verify repository method was called
        verify(propertyDelRepo, times(1)).findAll();
    }
}
