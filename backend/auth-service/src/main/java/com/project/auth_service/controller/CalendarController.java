package com.project.auth_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.auth_service.dto.CalendarEventDto;
import com.project.auth_service.service.GoogleCalendarService;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin(origins = "http://localhost:5173")
public class CalendarController {
    
    @Autowired
    private GoogleCalendarService calendarService;
    
    
    
    @PostMapping("/events")
    public ResponseEntity<Void> createEvent(
            @RequestBody CalendarEventDto event,
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        calendarService.createEvent(event, token);
        return ResponseEntity.ok().build();
    }
}

