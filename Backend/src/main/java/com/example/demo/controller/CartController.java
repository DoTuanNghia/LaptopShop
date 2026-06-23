package com.example.demo.controller;

import com.example.demo.entity.CartItem;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    private String getUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems() {
        return ResponseEntity.ok(cartService.getCartItems(getUsername()));
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem cartItemRequest) {
        return ResponseEntity.ok(cartService.addToCart(getUsername(), cartItemRequest));
    }

    @PutMapping("/update")
    public ResponseEntity<CartItem> updateCartItem(@RequestBody CartItem cartItemRequest) {
        return ResponseEntity.ok(cartService.updateCartItem(getUsername(), cartItemRequest));
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long id) {
        cartService.removeCartItem(getUsername(), id);
        return ResponseEntity.ok().build();
    }
}
