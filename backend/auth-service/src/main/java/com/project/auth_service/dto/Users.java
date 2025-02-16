package com.project.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
//@AllArgsConstructor
public class Users {
    private String name;



     public Users(String n) {
         name=n;
     }
}
