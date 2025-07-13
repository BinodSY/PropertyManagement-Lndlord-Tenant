package com.rentease.rentease.repository;
import com.rentease.rentease.entity.Lease;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface LeaseRepository extends MongoRepository<Lease, String> {
    // Additional query methods can be defined here if needed
    // For example, you can add methods to find leases by houseOwner, houseId, etc.

}
