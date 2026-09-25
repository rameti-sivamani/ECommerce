package com.ecommerce.backendspring.service;

import com.ecommerce.backendspring.dto.CartDTO;
import com.ecommerce.backendspring.dto.CartUpdateRequest;
import com.ecommerce.backendspring.exception.ResourceNotFoundException;
import com.ecommerce.backendspring.model.Cart;
import com.ecommerce.backendspring.model.Customer;
import com.ecommerce.backendspring.model.Gallery;
import com.ecommerce.backendspring.model.Product;
import com.ecommerce.backendspring.repository.CartRepository;
import com.ecommerce.backendspring.repository.CustomerRepository;
import com.ecommerce.backendspring.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CartService {

    static final String DEFAULT_IMAGE = "/products/placeholder.svg";

    private final CartRepository cartRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public CartService(CartRepository cartRepository, CustomerRepository customerRepository,
                       ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    public CartDTO addToCart(String customerEmail, Long productId, int quantity) {
        if (quantity < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1");
        }
        Customer customer = findCustomer(customerEmail);
        Product product = findProduct(productId);

        Cart cart = cartRepository.findByCustomerAndProduct(customer, product).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setCustomer(customer);
            newCart.setProduct(product);
            return newCart;
        });
        cart.setQuantity(Math.min(cart.getQuantity() + quantity, CartUpdateRequest.MAX_QUANTITY));
        return toDTO(cartRepository.save(cart));
    }

    /**
     * Sets the quantity of a product already in the cart. A quantity of 0 removes it.
     */
    public void updateQuantity(CartUpdateRequest request) {
        Customer customer = findCustomer(request.customerEmail());
        Product product = findProduct(request.productId());
        Cart cart = cartRepository.findByCustomerAndProduct(customer, product)
                .orElseThrow(() -> new ResourceNotFoundException("Product is not in the cart"));

        if (request.quantity() == 0) {
            cartRepository.delete(cart);
        } else {
            cart.setQuantity(request.quantity());
            cartRepository.save(cart);
        }
    }

    public void removeFromCart(String customerEmail, Long productId) {
        Customer customer = findCustomer(customerEmail);
        Product product = findProduct(productId);
        Cart cart = cartRepository.findByCustomerAndProduct(customer, product)
                .orElseThrow(() -> new ResourceNotFoundException("Product is not in the cart"));
        cartRepository.delete(cart);
    }

    @Transactional(readOnly = true)
    public List<CartDTO> getCartItemsByEmail(String customerEmail) {
        return cartRepository.findByCustomerEmail(normalize(customerEmail)).stream()
                .map(CartService::toDTO)
                .toList();
    }

    private Customer findCustomer(String email) {
        return customerRepository.findByEmail(normalize(email))
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found: " + email));
    }

    private static String normalize(String email) {
        return email == null ? null : email.trim().toLowerCase();
    }

    private Product findProduct(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + productId));
    }

    static CartDTO toDTO(Cart item) {
        Product product = item.getProduct();
        CartDTO dto = new CartDTO();
        dto.setProductId(product.getProductId());
        dto.setProductName(product.getName());
        dto.setProductDescription(product.getDescription());
        dto.setProductPrice(product.getPrice());
        dto.setGalleryUrl(product.getGallery() == null ? DEFAULT_IMAGE : product.getGallery().stream()
                .map(Gallery::getImageUrl)
                .findFirst()
                .orElse(DEFAULT_IMAGE));
        dto.setQuantity(item.getQuantity());
        return dto;
    }
}
