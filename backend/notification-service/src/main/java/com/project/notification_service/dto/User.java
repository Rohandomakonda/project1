package com.project.notification_service.dto;

import lombok.Data;

@Data
public class User {

    private Long id;
    private String email;
    private String name;
    private String password;
    private boolean isVerified = false;
    private String club;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }


    public String getClub() {
        return club;
    }

    public void setClub(String club) {
        this.club = club;
    }


}


