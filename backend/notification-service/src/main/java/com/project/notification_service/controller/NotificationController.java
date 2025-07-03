package com.project.notification_service.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
    
    private final SimpMessagingTemplate messagingTemplate;

    NotificationController(SimpMessagingTemplate messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }
    
    
   @PostMapping("/event/{eventTitle}")
   public ResponseEntity<String> createEventNotification(@PathVariable String eventTitle) {
       System.out.println("going to notify");
       messagingTemplate.convertAndSend("/topic/notifications", eventTitle);
       return ResponseEntity.ok("sent to ws");
   }

   
}
