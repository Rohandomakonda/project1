package com.project.notification_service.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationMessage {
    private Long id;
    private Long eventId;
    private Long userId;
    private String message;
    
}
