package com.project.app.dto;


import com.project.app.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private Long id;
    private String email;
    private String name;
    private Set<Role> roles;
    private String club;

    public AuthResponse(String accessToken, String refreshToken, Long id, String email, String name, Set<Role> roles,String club) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.email = email;
        this.name = name;
        this.roles = roles;
        this.club = club;

    }


}
