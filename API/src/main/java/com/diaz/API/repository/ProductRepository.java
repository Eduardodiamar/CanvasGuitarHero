/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.diaz.API.repository;

import com.diaz.API.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author eduardodiamar
 */
public interface ProductRepository extends JpaRepository<Product, Integer>{
    
}
