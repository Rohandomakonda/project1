package com.project.event_service.dto;

import lombok.Data;

@Data
public class User {
    private Long id;
    private String email;
    private String name;
    private String password;
    private boolean isVerified = false;
    private String club;
}
