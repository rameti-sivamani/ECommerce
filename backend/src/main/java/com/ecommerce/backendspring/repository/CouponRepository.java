package com.ecommerce.backendspring.repository;

import com.ecommerce.backendspring.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon, Long> {
}
