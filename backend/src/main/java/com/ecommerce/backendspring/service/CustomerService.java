package com.ecommerce.backendspring.service;
import com.ecommerce.backendspring.model.Customer;
import com.ecommerce.backendspring.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Get customer by email
    public Customer getCustomerByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found with email: " + email));
        return customer;
    }
}
