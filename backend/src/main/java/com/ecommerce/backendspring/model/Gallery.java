package com.ecommerce.backendspring.model;

import com.ecommerce.backendspring.model.Product;
import jakarta.persistence.*;


@Entity
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String imageUrl;

    // Getters and Setters

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Gallery{" +
                "imageId=" + imageId +
                ", product=" + product +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
