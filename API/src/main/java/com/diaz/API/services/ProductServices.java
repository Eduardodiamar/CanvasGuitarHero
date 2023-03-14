/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.diaz.API.services;

import com.diaz.API.model.Product;
import com.diaz.API.repository.ProductRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author eduardodiamar
 */
@Service
public class ProductServices {
   @Autowired
   private ProductRepository repository;
   public List<Product>listProducts(){
       return repository.findAll();
   }
   public void saveProduct(Product product){
       repository.save(product);
   }
   
   public Product getProductById(Integer id){
       return repository.findById(id).get();
   }
   
   public void editProduct(Product product, Integer id){
       repository.existsById(id);
   }
   public void deleteProduct(Integer id){
       repository.deleteById(id);
   }
   
}
