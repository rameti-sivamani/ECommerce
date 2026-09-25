package com.ecommerce.backendspring.controller;

import com.ecommerce.backendspring.dto.CartDTO;
import com.ecommerce.backendspring.dto.CartUpdateRequest;
import com.ecommerce.backendspring.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public CartDTO addProductToCart(@RequestParam String customerEmail, @RequestParam Long productId,
                                    @RequestParam(defaultValue = "1") int quantity) {
        return cartService.addToCart(customerEmail, productId, quantity);
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateQuantity(@Valid @RequestBody CartUpdateRequest request) {
        cartService.updateQuantity(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/remove")
    public ResponseEntity<Void> removeProductFromCart(@RequestParam String customerEmail,
                                                      @RequestParam Long productId) {
        cartService.removeFromCart(customerEmail, productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/products/{email}")
    public List<CartDTO> getCartProducts(@PathVariable String email) {
        return cartService.getCartItemsByEmail(email);
    }
}
