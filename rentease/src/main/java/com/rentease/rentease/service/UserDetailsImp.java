package com.rentease.rentease.service;

import com.rentease.rentease.entity.Tenant;
import com.rentease.rentease.entity.User; // Landlord entity
import com.rentease.rentease.repository.TenantRepository;
import com.rentease.rentease.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsImp implements UserDetailsService {

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private UserRepository landlordRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Try to find user in tenant collection
        Tenant tenant = tenantRepository.findByEmail(email).orElse(null);
        if (tenant != null) {
            UserDetails tenantUser = org.springframework.security.core.userdetails.User
                    .withUsername(tenant.getEmail())
                    .password(tenant.getPassword())
                    .roles(tenant.getRole()) // e.g., "TENANT"
                    .build();
            return tenantUser;
        }

        // Try to find user in landlord collection
        User landlord = landlordRepository.findByEmail(email).orElse(null);
        if (landlord != null) {
            UserDetails landlordUser = org.springframework.security.core.userdetails.User
                    .withUsername(landlord.getEmail())
                    .password(landlord.getPassword())
                    .roles(landlord.getRole()) // e.g., "LANDLORD"
                    .build();
            return landlordUser;

        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
