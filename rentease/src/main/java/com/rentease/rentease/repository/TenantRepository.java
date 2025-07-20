package com.rentease.rentease.repository;

import com.rentease.rentease.entity.Tenant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TenantRepository extends MongoRepository<Tenant, String> {
    Optional<Tenant> findByUsername(String username);
}