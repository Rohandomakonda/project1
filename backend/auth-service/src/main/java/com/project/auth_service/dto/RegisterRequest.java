package com.project.auth_service.dto;

import com.project.auth_service.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Set<Role> roles;
    private String club;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getClub() {
        return club;
    }

    public void setClub(String club) {
        this.club = club;
    }
}