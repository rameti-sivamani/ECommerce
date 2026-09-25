package com.ecommerce.backendspring.service;

import com.ecommerce.backendspring.exception.DuplicateResourceException;
import com.ecommerce.backendspring.exception.ResourceNotFoundException;
import com.ecommerce.backendspring.model.Customer;
import com.ecommerce.backendspring.repository.CustomerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Customer register(Customer customer) {
        if (customer.getEmail() == null || customer.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (customer.getPassword() == null || customer.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }
        String email = customer.getEmail().trim().toLowerCase();
        if (customerRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("An account with this email already exists");
        }
        customer.setEmail(email);
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setActive(true);
        return customerRepository.save(customer);
    }

    /**
     * Returns true when the email belongs to a customer and the password matches the stored hash.
     */
    public boolean authenticate(String email, String rawPassword) {
        if (email == null || rawPassword == null) {
            return false;
        }
        return customerRepository.findByEmail(email.trim().toLowerCase())
                .map(customer -> passwordEncoder.matches(rawPassword, customer.getPassword()))
                .orElse(false);
    }

    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with email: " + email));
    }
}
