package com.ecommerce.backendspring.repository;

import com.ecommerce.backendspring.model.AdminModel;
import com.ecommerce.backendspring.model.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<AdminModel, Long> {
    Optional<Customer> findByEmailAndPassword(String email, String password);
}
