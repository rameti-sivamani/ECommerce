package com.ecommerce.backendspring.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
@Entity
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long couponId;

    private String couponCode;
    private double discountPercentage;

    // Getters and Setters

    public Long getCouponId() {
        return couponId;
    }

    public void setCouponId(Long couponId) {
        this.couponId = couponId;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }


    @Override
    public String toString() {
        return "Coupon{" +
                "couponId=" + couponId +
                ", couponCode='" + couponCode + '\'' +
                ", discountPercentage=" + discountPercentage +
                '}';
    }

    public Object getCode() {
        return couponCode;
    }
}
