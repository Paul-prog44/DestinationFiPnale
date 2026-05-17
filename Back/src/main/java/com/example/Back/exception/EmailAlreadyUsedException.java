// src/main/java/com/example/Back/exception/EmailAlreadyUsedException.java
package com.example.Back.exception;

public class EmailAlreadyUsedException extends RuntimeException {
    public EmailAlreadyUsedException(String email) {
        super("Email déjà utilisé : " + email);
    }
}