package com.rentease.rentease.controller;


import com.rentease.rentease.config.JwtUtil;
import com.rentease.rentease.dto.AuthRequest;
import com.rentease.rentease.dto.AuthResponse;
import com.rentease.rentease.entity.User;
import com.rentease.rentease.entity.Tenant;
import com.rentease.rentease.repository.UserRepository;
import com.rentease.rentease.repository.TenantRepository;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private  AuthenticationManager authManager;
    @Autowired
    private  JwtUtil jwtUtil;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  TenantRepository tenantRepository;
    @Autowired
    private  PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authManager,
                          JwtUtil jwtUtil,
                          UserRepository userRepository,
                          TenantRepository tenantRepository,
                          PasswordEncoder passwordEncoder) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.tenantRepository = tenantRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Login endpoint for both landlords (User) and tenants
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest request) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            String email = authentication.getName();

            // Check which collection this user belongs to
            String role = "UNKNOWN";

            Optional<User> landlord = userRepository.findByEmail(email);
            Optional<Tenant> tenant = tenantRepository.findByEmail(email);

            if (landlord.isPresent()) {
                role = landlord.get().getRole(); // get actual role
            } else if (tenant.isPresent()) {
                role = tenant.get().getRole();
            }

            if (role.equals("UNKNOWN")) {
                return ResponseEntity.status(401).body(Map.of("error", "User not found in system"));
            }

            String token = jwtUtil.generateToken(email, role);
            return ResponseEntity.ok(new AuthResponse(token, email, role));

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    /**
     * Register endpoint: save to correct collection
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRequest request,
                                      @RequestParam(defaultValue = "TENANT") String role) {

        // If role is landlord → save to User collection
        if ("LANDLORD".equalsIgnoreCase(role)) {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already registered as landlord"));
            }

            User landlord = new User();
            landlord.setEmail(request.getEmail());
            landlord.setPassword(passwordEncoder.encode(request.getPassword()));
            landlord.setRole("LANDLORD");

            userRepository.save(landlord);
            return ResponseEntity.ok(Map.of("message", "Landlord registered"));
        }

        // If role is tenant → save to Tenant collection
        else if ("TENANT".equalsIgnoreCase(role)) {
            if (tenantRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email already registered as tenant"));
            }

            Tenant tenant = new Tenant();
            tenant.setEmail(request.getEmail());
            tenant.setPassword(passwordEncoder.encode(request.getPassword()));
            tenant.setRole("TENANT");

            tenantRepository.save(tenant);
            return ResponseEntity.ok(Map.of("message", "Tenant registered"));
        }

        // Invalid role
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid role. Allowed: TENANT or LANDLORD"));
    }
}
