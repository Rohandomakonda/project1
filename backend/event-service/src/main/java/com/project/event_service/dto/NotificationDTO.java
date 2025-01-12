package com.project.event_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationDTO {
    private Long eventId;
    private Long userId;
    private boolean isRead;
}

