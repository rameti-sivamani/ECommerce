package com.ecommerce.backendspring.repository;

import com.ecommerce.backendspring.controller.CustomerCreation;
import com.ecommerce.backendspring.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmailAndPassword(String email, String password);

    Optional<Customer> findByEmail(String email);
}
