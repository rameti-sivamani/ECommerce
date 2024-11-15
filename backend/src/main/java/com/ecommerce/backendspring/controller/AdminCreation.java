package com.ecommerce.backendspring.controller;
import com.ecommerce.backendspring.model.AdminModel;
import com.ecommerce.backendspring.model.Customer;
import com.ecommerce.backendspring.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminCreation {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody AdminModel admin) {
        AdminModel savedAdmins = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmins);
    }
}
