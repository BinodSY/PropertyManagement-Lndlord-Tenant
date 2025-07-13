package com.rentease.rentease.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.rentease.rentease.entity.PropertyDel;

public interface PropertyDelRepo extends MongoRepository<PropertyDel, String> {
    // Additional custom methods if needed
}
