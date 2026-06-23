package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Page<Product> searchProducts(String keyword, Pageable pageable) {
        // Without Specification for simple search, actually Pageable needs JPA repo method
        // But for simplicity let's use a simpler approach or findByNameContaining...
        // Assuming we need pagination on search
        return productRepository.findAll((Specification<Product>) (root, query, criteriaBuilder) -> {
            String likePattern = "%" + keyword.toLowerCase() + "%";
            return criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), likePattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likePattern)
            );
        }, pageable);
    }

    public Page<Product> filterProducts(String brand, String ram, String cpu, Pageable pageable) {
        return productRepository.findAll((Specification<Product>) (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (brand != null && !brand.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("brand"), brand));
            }
            if (ram != null && !ram.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("ram"), ram));
            }
            if (cpu != null && !cpu.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("cpu"), cpu));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }, pageable);
    }
}
