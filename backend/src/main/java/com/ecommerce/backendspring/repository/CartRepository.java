package com.ecommerce.backendspring.repository;

import com.ecommerce.backendspring.model.Cart;
import com.ecommerce.backendspring.model.Customer;
import com.ecommerce.backendspring.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByCustomerAndProduct(Optional<Customer> customer, Product product);

    List<Cart> findByCustomerEmail(String customerEmail);
}
