package com.ecommerce.backendspring.controller;

import com.ecommerce.backendspring.model.AuthModel;
import com.ecommerce.backendspring.model.Customer;

import com.ecommerce.backendspring.repository.CustomerRepository;
import com.ecommerce.backendspring.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CustomerCreation {

    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody Customer customer) {
        Customer savedCustomers = customerRepository.save(customer);
        return ResponseEntity.ok(savedCustomers);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginCustomer(@RequestBody AuthModel loginRequest) {
        Optional<Customer> customer = customerRepository.findByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());

        Map<String, Object> response = new HashMap<>();  // Creating a map to hold JSON response

        if (customer.isPresent()) {
            // Login successful
            response.put("success", true);
            response.put("message", "Login successful");
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)  // Ensures content type is JSON
                    .body(response);
        } else {
            // Invalid credentials
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)  // Ensures content type is JSON
                    .body(response);
        }
    }
    @Autowired
    private CustomerService customerService;
    @GetMapping("/customer/profile")
    public ResponseEntity<Customer> getCustomerProfile(@RequestParam String email) {
        Customer customer = customerService.getCustomerByEmail(email);
        return ResponseEntity.ok(customer);
    }

}
