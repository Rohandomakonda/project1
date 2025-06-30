package com.project.notification_service.dto;

import org.springframework.stereotype.Component;

@Component
public class NotificationRequest {
    private String msg;

    // Default constructor
    public NotificationRequest() {
    }

    // Constructor with parameters
    public NotificationRequest(String msg) {
        this.msg = msg;
    }

    // Getters and setters
    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}