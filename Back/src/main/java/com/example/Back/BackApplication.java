package com.example.Back;

import org.springframework.boot.SpringApplication;
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

    @GetMapping("/test-insert")
    public String testInsert() {
        try {
            // 1. Création d'un nouvel objet Role (grâce à Lombok @Builder)
            Role newRole = Role.builder()
                               .name("ADMIN")
                               .build();

            // 2. Sauvegarde en base de données (INSERT)
            RoleRepository.save(newRole);

            // 3. Récupération de tous les rôles (SELECT *)
            List<Role> roles = RoleRepository.findAll();

            return "✅ Objet inséré avec succès ! Nombre de rôles en base : " + roles.size() 
                 + " | Dernier inséré : " + roles.get(roles.size() - 1).getName();

        } catch (Exception e) {
            return "❌ Erreur lors de l'insertion : " + e.getMessage();
        }
    }
}