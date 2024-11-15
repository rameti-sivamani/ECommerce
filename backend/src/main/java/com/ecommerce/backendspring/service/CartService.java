package com.ecommerce.backendspring.service;

import com.ecommerce.backendspring.dto.CartDTO;
import com.ecommerce.backendspring.model.Cart;
import com.ecommerce.backendspring.model.Customer;
import com.ecommerce.backendspring.model.Product;
import com.ecommerce.backendspring.model.Gallery;
import com.ecommerce.backendspring.repository.CartRepository;
import com.ecommerce.backendspring.repository.CustomerRepository;
import com.ecommerce.backendspring.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private ProductRepository productRepository;

    public Cart removeFromCart(String customerEmail,Long productId ) {
        Optional<Customer> customer = customerRepository.findByEmail(customerEmail);
        Product product = productRepository.findById(productId).orElse(null);
        if(product==null || customer==null) {
            throw new IllegalArgumentException("Invalid customer email or product ID");

        }
        Customer customerToRemove = customer.get();
        Product productToRemove = productRepository.findById(productId).orElse(null);
        Cart existingCart = cartRepository.findByCustomerAndProduct(customer, product);
        if (existingCart != null) {

                 cartRepository.delete(existingCart);

         return null;
        }
        throw new IllegalArgumentException("Product not found in customer's cart");

    }


    public Cart addToCart(String customerEmail, Long productId, int quantity) {
        Optional<Customer> customer = customerRepository.findByEmail(customerEmail); // Fetch customer by email
        Product product = productRepository.findById(productId).orElse(null); // Fetch product by ID
        if (customer == null || product == null) {
            throw new IllegalArgumentException("Invalid customer email or product ID");
        }

        Cart existingCart = cartRepository.findByCustomerAndProduct(customer, product);

        if (existingCart != null) {
            // Update quantity if the product is already in the cart
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            return cartRepository.save(existingCart);
        } else {
            // Create a new cart entry
            Cart cart = new Cart();
            cart.setCustomer(customer);
            cart.setProduct(product);
            cart.setQuantity(quantity);
            return cartRepository.save(cart);
        }
    }


    public List<CartDTO> getCartItemsByEmail(String customerEmail) {
        List<Cart> cartItems = cartRepository.findByCustomerEmail(customerEmail);

        return cartItems.stream().map(item -> {
            CartDTO cartDTO = new CartDTO();
            cartDTO.setProductName(item.getProduct().getName());
            cartDTO.setProductDescription(item.getProduct().getDescription());
            cartDTO.setProductPrice(item.getProduct().getPrice());

            // Fetch the gallery URLs from the gallery table
            List<String> galleryUrls = item.getProduct().getGallery().stream()
                    .map(Gallery::getImageUrl)
                    .collect(Collectors.toList());

            // Set the first image URL, or use a default if none exist
            if (!galleryUrls.isEmpty()) {
                cartDTO.setGalleryUrl(galleryUrls.get(0)); // First image URL
            } else {
                cartDTO.setGalleryUrl("default-image.jpg"); // Default image if no gallery URLs
            }

            cartDTO.setQuantity(item.getQuantity());
            return cartDTO;
        }).collect(Collectors.toList());
    }


}
