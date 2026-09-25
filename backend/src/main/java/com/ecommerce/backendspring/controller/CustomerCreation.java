package com.ecommerce.backendspring.controller;

import com.ecommerce.backendspring.model.AuthModel;
import com.ecommerce.backendspring.model.Customer;
import com.ecommerce.backendspring.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CustomerCreation {

    private final CustomerService customerService;

    public CustomerCreation(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/register")
    public ResponseEntity<Customer> registerUser(@RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.register(customer));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginCustomer(@RequestBody AuthModel loginRequest) {
        if (customerService.authenticate(loginRequest.getEmail(), loginRequest.getPassword())) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Login successful"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("success", false, "message", "Invalid email or password"));
    }

    @GetMapping("/customer/profile")
    public ResponseEntity<Customer> getCustomerProfile(@RequestParam String email) {
        return ResponseEntity.ok(customerService.getCustomerByEmail(email));
    }
}
