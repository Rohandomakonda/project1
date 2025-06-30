package com.project.notification_service.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.project.notification_service.dto.NotificationRequest;
// import com.project.notification_service.model.EventNotification;
//import com.project.notification_service.service.EventNotificationListener;


@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    
    private final SimpMessagingTemplate messagingTemplate;

    NotificationController(SimpMessagingTemplate messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }
    
    //@Autowired
   // private EventNotificationListener notificationService;
    
   @PostMapping("/event/{eventTitle}")
   public ResponseEntity<String> createEventNotification(@PathVariable String eventTitle) {
       System.out.println("going to notify");
       messagingTemplate.convertAndSend("/topic/notifications", eventTitle);
       return ResponseEntity.ok("sent to ws");
   }

   // topic                queue
   // notifications

   // event -> /topic/notification <-> frontend
    
    // @GetMapping("/unread/{userId}")
    // public ResponseEntity<List<EventNotification>> getUnreadNotifications(@PathVariable Long userId) {
    //     return ResponseEntity.ok(notificationService.getUnreadNotifications(userId));
    // }
    
    // @PutMapping("/markAsRead/{notificationId}")
    // public ResponseEntity<?> markAsRead(@PathVariable Long notificationId) {
    //     notificationService.markAsRead(notificationId);
    //     return ResponseEntity.ok().build();
    // }
}
