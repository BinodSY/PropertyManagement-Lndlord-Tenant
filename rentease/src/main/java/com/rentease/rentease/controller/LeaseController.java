package com.rentease.rentease.controller;

import com.rentease.rentease.entity.Lease;
import com.rentease.rentease.service.LeaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/leases")
public class LeaseController {

    @Autowired
    private LeaseService leaseService;

    
    @PostMapping
    public ResponseEntity<Lease> createLease(@RequestBody Lease lease) {
        Lease savedLease = leaseService.createLease(lease);
        return ResponseEntity.ok(savedLease);
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Lease>> createLeases(@RequestBody List<Lease> leases) {
    List<Lease> savedLeases = leaseService.createLeases(leases);
    return ResponseEntity.ok(savedLeases);
    }
 


    // Get All Leases
    @GetMapping
    public ResponseEntity<List<Lease>> getAllLeases() {
        return ResponseEntity.ok(leaseService.getAllLeases());
    }

    // Get Lease by ID
    @GetMapping("/{id}")
    public ResponseEntity<Lease> getLeaseById(@PathVariable String id) {
        Optional<Lease> lease = leaseService.getLeaseById(id);
        return lease.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lease> updateOrReplaceLease(@PathVariable String id, @RequestBody Lease lease) {
    Optional<Lease> existingLease = leaseService.getLeaseById(id);

    Lease updatedLease = leaseService.updateOrReplaceLease(id, lease);

    if (existingLease.isPresent()) {
        return ResponseEntity.ok(updatedLease); // 200 OK if updated
         }   else {
        return ResponseEntity.status(201).body(updatedLease); // 201 Created if inserted
        }
    }


    // Delete Lease by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLease(@PathVariable String id) {
        leaseService.deleteLease(id);
        return ResponseEntity.noContent().build();
    }
}
