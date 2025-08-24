package com.rentease.rentease.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http 
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/","/create-tenant","/create-landlord").permitAll()
                        .requestMatchers("/propertiesDel/available","/propertiesDel/book-property").hasRole("TENANT")
                        .requestMatchers("/tenant/**").hasRole("TENANT") // <-- allow both roles
                        .requestMatchers("/landlord/","/propertiesDel/user-properties","/propertiesDel/properties-listing").hasRole("LANDLORD") // <-- allow both roles
                        .requestMatchers("/adminn/**").hasRole("Rentease_ADMIN@")
                        .anyRequest().authenticated()
                        
                )
                .formLogin(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults())
                .build();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
