package com.example.Back;

import org.springframework.boot.SpringApplication;

import com.example.Back.model.AirlineCompany;
import com.example.Back.model.Role;
import com.example.Back.repository.RoleRepository;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;


@SpringBootApplication
@RestController 
public class BackApplication {

    @Autowired
    private JdbcTemplate jdbcTemplate; 

    @Autowired
    private RoleRepository RoleRepository;

    public static void main(String[] args) {
        SpringApplication.run(BackApplication.class, args);
    }

}