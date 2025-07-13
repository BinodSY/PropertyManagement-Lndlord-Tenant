package com.rentease.rentease.service;

import com.rentease.rentease.entity.Lease;
import com.rentease.rentease.repository.LeaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaseService {

    @Autowired
    private LeaseRepository leaseRepository;

      public Lease createLease(Lease lease) {
        return leaseRepository.save(lease);
    }

    public List<Lease> getAllLeases() {
        return leaseRepository.findAll();
    }
        public List<Lease> createLeases(List<Lease> leases) {
    return leaseRepository.saveAll(leases);
    }


    public Optional<Lease> getLeaseById(String Id) {
        return leaseRepository.findById(Id);
    }

    public Lease updateOrReplaceLease(String Id, Lease lease) {
    lease.setId(Id); // ensure the lease ID matches the path variable
    return leaseRepository.save(lease); // save() will update if exists, insert if not
    }

  
   

    public void deleteLease(String id) {
        leaseRepository.deleteById(id);
    }
}
