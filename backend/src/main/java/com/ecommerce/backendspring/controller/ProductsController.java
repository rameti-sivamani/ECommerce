package com.ecommerce.backendspring.controller;
import com.ecommerce.backendspring.model.Product;
import com.ecommerce.backendspring.dto.ProductDTO;
import com.ecommerce.backendspring.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductsService productService;

    @PostMapping("/create")
    public Product createProduct(@RequestBody ProductDTO productDTO) {
        return productService.createProduct(
                productDTO.getName(),
                productDTO.getDescription(),
                productDTO.getPrice(),
                productDTO.getCategoryName(),
                productDTO.getCouponCode(),
                productDTO.getDiscount(),
                productDTO.getImageUrls()
        );
    }

    @GetMapping("/category/{categoryName}")
    public List<ProductDTO> getProductsByCategory(@PathVariable String categoryName) {
        return productService.getProductsByCategoryName(categoryName);
    }
    @GetMapping("/products")
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }
}
