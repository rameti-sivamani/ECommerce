package com.ecommerce.backendspring.service;

import com.ecommerce.backendspring.dto.ProductDTO;
import com.ecommerce.backendspring.model.Category;
import com.ecommerce.backendspring.model.Gallery;
import com.ecommerce.backendspring.repository.CategoryRepository;
import com.ecommerce.backendspring.repository.GalleryRepository;
import com.ecommerce.backendspring.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecommerce.backendspring.model.Product;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductsService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private GalleryRepository galleryRepository;
    public Product createProduct(String name, String description, double price, String categoryName, String couponId, double discount, List<String> imageUrls) {
        // Find the category by name
        Category category = categoryRepository.findByCategoryName(categoryName);
        if (category == null) {
            throw new RuntimeException("Category with name '" + categoryName + "' not found");
        }

        // Create the product and set the category
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setCategory(category);  // Associate category
        product.setDiscount(discount);

        // Save the product
        product = productRepository.save(product);


        // Add gallery images
        for (String url : imageUrls){
            Gallery image = new Gallery();
            image.setProduct(product);  // Set the product for the image
            image.setImageUrl(url);     // Set the image URL
            galleryRepository.save(image);  // Save the image in the repository
        }

        return product;
    }

//gatting all the products by the category name
public List<ProductDTO> getProductsByCategoryName(String categoryName) {
    List<Product> products = productRepository.findByCategoryName(categoryName);
    return products.stream()
            .map(ProductDTO::new)  // Convert each Product to ProductDTO
            .collect(Collectors.toList());
}

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(Product product) {
        List<String> galleryUrls = product.getGalleries().stream()
                .map(Gallery::getImageUrl)
                .collect(Collectors.toList());

        return new ProductDTO(
                product.getId(),
                product.getProductId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                galleryUrls
        );
    }

}
