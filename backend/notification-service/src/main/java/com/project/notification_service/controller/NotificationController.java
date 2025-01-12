package com.project.notification_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import com.project.notification_service.dto.EventNotificationDTO;
import com.project.notification_service.dto.NotificationMessage;
import com.project.notification_service.model.EventNotification;
import com.project.notification_service.service.EventNotificationListener;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private EventNotificationListener notificationService;
    
    @PostMapping("/event")
    public ResponseEntity<?> createEventNotification(@RequestBody EventNotificationDTO dto) {
        EventNotification notification = notificationService.createNotification(dto);
        
        // Send WebSocket notification to specific user
        messagingTemplate.convertAndSendToUser(
            dto.getUserId().toString(),
            "/queue/notifications",     
            new NotificationMessage(notification.getId(),notification.getEventId(),notification.getUserId(),"new event added")
        );
        
        return ResponseEntity.ok(notification);
    }
    
    // @GetMapping("/unread/{userId}")
    // public ResponseEntity<List<EventNotification>> getUnreadNotifications(@PathVariable Long userId) {
    //     return ResponseEntity.ok(notificationService.getUnreadNotifications(userId));
    // }
    
    @PutMapping("/markAsRead/{notificationId}")
    public ResponseEntity<?> markAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok().build();
    }
}
