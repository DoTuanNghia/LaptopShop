package com.example.demo.service;

import com.example.demo.entity.CartItem;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public List<CartItem> getCartItems(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();
        return cartItemRepository.findByUser(user);
    }

    public CartItem addToCart(String username, CartItem cartItemRequest) {
        User user = userRepository.findByUsername(username).orElseThrow();
        Product product = productRepository.findById(cartItemRequest.getProduct().getId()).orElseThrow();

        Optional<CartItem> existingItemOpt = cartItemRepository.findByUserAndProduct(user, product);

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            existingItem.setQuantity(existingItem.getQuantity() + cartItemRequest.getQuantity());
            return cartItemRepository.save(existingItem);
        }

        CartItem newItem = new CartItem();
        newItem.setUser(user);
        newItem.setProduct(product);
        newItem.setQuantity(cartItemRequest.getQuantity());
        return cartItemRepository.save(newItem);
    }

    public CartItem updateCartItem(String username, CartItem cartItemRequest) {
        User user = userRepository.findByUsername(username).orElseThrow();
        CartItem existingItem = cartItemRepository.findById(cartItemRequest.getId()).orElseThrow();

        if (!existingItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        existingItem.setQuantity(cartItemRequest.getQuantity());
        return cartItemRepository.save(existingItem);
    }

    public void removeCartItem(String username, Long cartItemId) {
        User user = userRepository.findByUsername(username).orElseThrow();
        CartItem existingItem = cartItemRepository.findById(cartItemId).orElseThrow();

        if (!existingItem.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        cartItemRepository.delete(existingItem);
    }
}
