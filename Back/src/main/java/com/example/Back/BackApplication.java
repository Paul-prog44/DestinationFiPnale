package com.example.Back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
@RestController 
public class BackApplication {

    @Autowired
    private JdbcTemplate jdbcTemplate; 

    public static void main(String[] args) {
        SpringApplication.run(BackApplication.class, args);
    }

    @GetMapping("/test-db")
    public String testConnection() {
        try {
            
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            if (result != null && result == 1) {
                return "✅ Connexion à PostgreSQL réussie ! La base répond parfaitement.";
            } else {
                return "⚠️ La base a répondu, mais le résultat est inattendu.";
            }
        } catch (Exception e) {
            return "❌ Erreur de connexion : " + e.getMessage();
        }
    }
}