package com.ecommerce.backendspring.controller;

import com.ecommerce.backendspring.exception.DuplicateResourceException;
import com.ecommerce.backendspring.model.AdminModel;
import com.ecommerce.backendspring.repository.AdminRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminCreation {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminCreation(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<AdminModel> registerUser(@RequestBody AdminModel admin) {
        if (admin.getPassword() == null || admin.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new DuplicateResourceException("An admin with this email already exists");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return ResponseEntity.status(HttpStatus.CREATED).body(adminRepository.save(admin));
    }
}
