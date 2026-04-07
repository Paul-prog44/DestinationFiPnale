package entity;


import org.springframework.web.bind.annotation.SessionAttribute;

import com.fasterxml.jackson.annotation.JsonSetter;

import jakarta.persistence.Id;

@Entity
@Table(name = "users")
public class User {
    @Getter 
    @Setter 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id  ; 
    @Getter
    @Setter 
    private String firstname ; 
    @Getter
    @Setter 
    private String lastname ; 
    @Getter
    @Setter 
    private String email ; 
    @Getter
    @Setter 
    private String password ; 
    @Getter
    @Setter 
    private date date_of_birth ; 
    @Getter 
    @Setter 
    private long role_id ; 
}
