package com.ecommerce.backendspring;

import com.ecommerce.backendspring.dto.ProductDTO;
import com.ecommerce.backendspring.model.Category;
import com.ecommerce.backendspring.repository.CategoryRepository;
import com.ecommerce.backendspring.repository.ProductRepository;
import com.ecommerce.backendspring.service.ProductsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Fills an empty catalogue with demo categories and products, so the shop works right after cloning.
 * Disable with SEED_DEMO_DATA=false.
 */
@Component
@ConditionalOnProperty(name = "app.seed-demo-data", havingValue = "true")
public class DemoDataLoader implements CommandLineRunner {

    public static final String MENS = "mens wear";
    public static final String WOMENS = "womens wear";
    public static final String KIDS = "kids wear";

    private static final Logger log = LoggerFactory.getLogger(DemoDataLoader.class);

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductsService productsService;

    public DemoDataLoader(CategoryRepository categoryRepository, ProductRepository productRepository,
                          ProductsService productsService) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productsService = productsService;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            return;
        }
        for (String name : List.of(MENS, WOMENS, KIDS)) {
            if (categoryRepository.findByCategoryName(name) == null) {
                Category category = new Category();
                category.setCategoryName(name);
                categoryRepository.save(category);
            }
        }

        product(MENS, "Classic Oxford Shirt", "Slim-fit cotton shirt for office and weekends.", 1299, "mens-shirt");
        product(MENS, "Denim Jacket", "Mid-wash denim jacket with button front.", 2499, "mens-jacket");
        product(MENS, "Chino Trousers", "Stretch cotton chinos in a tapered fit.", 1599, "mens-chinos");
        product(MENS, "Crew Neck T-Shirt", "Everyday soft cotton tee.", 499, "mens-tee");
        product(WOMENS, "Floral Summer Dress", "Lightweight midi dress with a floral print.", 1899, "womens-dress");
        product(WOMENS, "Cotton Kurta", "Straight-cut kurta with block-print details.", 1199, "womens-kurta");
        product(WOMENS, "High-Rise Jeans", "Straight-leg jeans in dark indigo.", 1799, "womens-jeans");
        product(WOMENS, "Knit Cardigan", "Relaxed-fit cardigan for cooler days.", 1499, "womens-cardigan");
        product(KIDS, "Dinosaur Hoodie", "Cosy fleece hoodie with a dino print.", 899, "kids-hoodie");
        product(KIDS, "Play Shorts Set", "Pack of two cotton shorts.", 599, "kids-shorts");
        product(KIDS, "Party Frock", "Twirl-ready frock with tulle layers.", 1099, "kids-frock");
        product(KIDS, "Striped Polo", "Breathable polo for school and play.", 549, "kids-polo");

        log.info("Inserted demo categories and products");
    }

    private void product(String category, String name, String description, double price, String image) {
        ProductDTO dto = new ProductDTO();
        dto.setCategoryName(category);
        dto.setName(name);
        dto.setDescription(description);
        dto.setPrice(price);
        dto.setImageUrls(List.of("/products/" + image + ".svg"));
        productsService.createProduct(dto);
    }
}
