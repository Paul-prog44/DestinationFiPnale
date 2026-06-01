package com.example.Back.repository;

import com.example.Back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    // cherche un utilisateur par email
    Optional<User> findByEmail(String email);
    // vérifie si un email est déjà utilisé
    boolean existsByEmail(String email);
}