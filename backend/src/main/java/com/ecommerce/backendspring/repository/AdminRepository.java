package com.ecommerce.backendspring.repository;

import com.ecommerce.backendspring.model.AdminModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<AdminModel, String> {

    boolean existsByEmail(String email);
}
