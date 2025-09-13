package com.rentease.rentease.repository;
import com.rentease.rentease.entity.User;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
public interface UserRepository extends MongoRepository<User, String> {
    // Additional query methods can be defined here if needed
    // For example, you can add methods to find leases by houseOwner, houseId, etc.

    Optional<User> findByUsername(String username);
    Optional<User> deleteByUsername(String username);
    Optional<User> findByEmail(String email);

}
