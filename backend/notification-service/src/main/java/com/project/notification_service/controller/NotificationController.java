package com.project.notification_service.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;



@RestController
@RequestMapping("/api/notifications")
@Slf4j
public class NotificationController {
    
    private final SimpMessagingTemplate messagingTemplate;

    NotificationController(SimpMessagingTemplate messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }
    
    
   @PostMapping("/event/{eventTitle}")
   public ResponseEntity<String> createEventNotification(@PathVariable String eventTitle) {
       log.info("going to notify");
       messagingTemplate.convertAndSend("/topic/notifications", eventTitle);
       return ResponseEntity.ok("sent to ws");
   }

   
}
