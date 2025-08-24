package com.rentease.rentease.service;

import com.rentease.rentease.entity.User;
import com.rentease.rentease.repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private UserRepository userRepository;

    

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateAtliting(User user) {
        return userRepository.save(user);
    }

        public List<User> createUser(List<User> user) {
    return userRepository.saveAll(user);
    }


    

    public User updateOrReplaceLease(String username, User user) {
    user.setUsername(username); // ensure the lease ID matches the path variable
    return userRepository.save(user); // save() will update if exists, insert if not
    }

    public Optional<User> deleteUser(String username) {
        return userRepository.deleteByUsername(username);
    }
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
   

    
}
