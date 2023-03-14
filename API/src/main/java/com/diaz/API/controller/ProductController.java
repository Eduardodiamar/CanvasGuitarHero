/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.diaz.API.controller;

import ch.qos.logback.core.status.Status;
import com.diaz.API.model.Product;
import com.diaz.API.services.ProductServices;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author eduardodiamar
 */
@RestController
@RequiredArgsConstructor

public class ProductController {
    
    private final ProductServices productService;
    
    @GetMapping("/product")
    public List<Product>listProducts(){
        return productService.listProducts();
    }
    
    @GetMapping("/product/{id}")
    public ResponseEntity<Product>getProductById(@PathVariable Integer id){
        try{
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(product);
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/product")
    public void newProduct(@RequestBody Product product){
        productService.saveProduct(product);
    }
    
    @PutMapping("/product/{id}")
    public ResponseEntity<?> editProduct(@RequestBody Product product, @PathVariable Integer id){
        try {
            Product existentProduct = productService.getProductById(id);
            existentProduct.setName(product.getName());
            existentProduct.setPrice(product.getPrice());
            productService.saveProduct(existentProduct);
            return new ResponseEntity<Product>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/product/{id}")
    public void deleteProduct(@PathVariable Integer id){
        productService.deleteProduct(id);
    }
}
