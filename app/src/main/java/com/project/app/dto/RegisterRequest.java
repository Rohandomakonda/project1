package com.project.app.dto;

import com.project.app.model.Role;
import lombok.Data;

import java.util.Set;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private Set<Role> roles;
    private String club;


}
