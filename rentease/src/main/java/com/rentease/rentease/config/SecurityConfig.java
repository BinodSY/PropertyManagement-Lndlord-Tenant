package com.rentease.rentease.config;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.provisioning.InMemoryUserDetailsManager;



@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       return  http
                    .csrf(Customizer->Customizer.disable())
                    .authorizeHttpRequests(request->request.anyRequest().authenticated())
                    .formLogin(Customizer.withDefaults())
                    .httpBasic(Customizer.withDefaults())
                    .sessionManagement(session->session.sessionCreationPolicy(sessionCreationPolicy.STATELESS))
                    .build();
                    
                    
    }
   
}
