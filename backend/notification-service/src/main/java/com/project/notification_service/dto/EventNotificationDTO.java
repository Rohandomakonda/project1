package com.project.notification_service.dto;

import lombok.Data;

@Data
public class EventNotificationDTO {
    private Long id;
    private Long eventId;
    private Long userId;
    private boolean isRead;
}
