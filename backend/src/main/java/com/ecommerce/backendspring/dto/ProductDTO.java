package com.ecommerce.backendspring.dto;

import com.ecommerce.backendspring.model.Gallery;
import com.ecommerce.backendspring.model.Product;

import java.util.List;

public class ProductDTO {
    private Long productId;
    private String name;
    private String description;
    private double price;
    private double discount;
    private String categoryName;
    private String couponCode;
    private List<String> imageUrls;

    public ProductDTO() {
        // No-arg constructor for Jackson
    }

    public ProductDTO(Product product) {
        this.productId = product.getProductId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.price = product.getPrice();
        this.discount = product.getDiscount();
        this.categoryName = product.getCategory() != null ? product.getCategory().getCategoryName() : null;
        this.couponCode = product.getCoupon() != null ? product.getCoupon().getCouponCode() : null;
        this.imageUrls = product.getGallery() == null ? List.of() : product.getGallery().stream()
                .map(Gallery::getImageUrl)
                .toList();
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCouponCode() {
        return couponCode;
    }

    public void setCouponCode(String couponCode) {
        this.couponCode = couponCode;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }
}
