package com.ecommerce.backendspring.service;

import com.ecommerce.backendspring.dto.ProductDTO;
import com.ecommerce.backendspring.exception.ResourceNotFoundException;
import com.ecommerce.backendspring.model.Category;
import com.ecommerce.backendspring.model.Gallery;
import com.ecommerce.backendspring.model.Product;
import com.ecommerce.backendspring.repository.CategoryRepository;
import com.ecommerce.backendspring.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductsService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductsService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public ProductDTO createProduct(ProductDTO request) {
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("Product name is required");
        }
        if (request.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }
        Category category = categoryRepository.findByCategoryName(request.getCategoryName());
        if (category == null) {
            throw new ResourceNotFoundException("Category '" + request.getCategoryName() + "' not found");
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setDiscount(request.getDiscount());
        product.setCategory(category);

        List<Gallery> gallery = new ArrayList<>();
        if (request.getImageUrls() != null) {
            for (String url : request.getImageUrls()) {
                Gallery image = new Gallery();
                image.setProduct(product);
                image.setImageUrl(url);
                gallery.add(image);
            }
        }
        // Gallery images are saved together with the product (cascade)
        product.setGallery(gallery);

        return new ProductDTO(productRepository.save(product));
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByCategoryName(String categoryName) {
        return productRepository.findByCategoryName(categoryName).stream()
                .map(ProductDTO::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(ProductDTO::new)
                .toList();
    }
}
