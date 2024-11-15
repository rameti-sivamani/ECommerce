package com.ecommerce.backendspring.controller;
import com.ecommerce.backendspring.dto.CartDTO;
import com.ecommerce.backendspring.model.Cart;
import com.ecommerce.backendspring.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addProductToCart(@RequestParam String customerEmail, @RequestParam Long productId, @RequestParam int quantity) {
        return cartService.addToCart(customerEmail, productId, quantity);
    }
    @PostMapping("/remove")
    public Cart removeProductFromCart(@RequestParam String customerEmail, @RequestParam Long productId) {
        return cartService.removeFromCart(customerEmail, productId);
    }

    @GetMapping("/products/{email}")
    public ResponseEntity<List<CartDTO>> getCartProducts(@PathVariable String email) {
        List<CartDTO> cartProducts = cartService.getCartItemsByEmail(email);
        return ResponseEntity.ok(cartProducts);
    }

}
