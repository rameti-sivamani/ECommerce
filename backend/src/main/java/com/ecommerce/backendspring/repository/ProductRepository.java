package com.ecommerce.backendspring.repository;
import java.util.List;

import com.ecommerce.backendspring.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;


import org.springframework.data.jpa.repository.Query;



public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE LOWER(p.category.categoryName) = LOWER(:categoryName)")
    List<Product> findByCategoryName(@Param("categoryName") String categoryName);
}
