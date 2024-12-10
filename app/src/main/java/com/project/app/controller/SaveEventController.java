package com.project.app.controller;

import com.project.app.service.SavedEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class SaveEventController {

    @Autowired
    private SavedEventService savedEventService;

    @PostMapping("/saved-events/{eventId}")
    public ResponseEntity<String> saveEvent(@PathVariable("eventId") Long eventId, @RequestParam("userId") Long userId) {

        savedEventService.saveEvent(eventId, userId);
        return ResponseEntity.ok("Event saved successfully!");
    }
    @DeleteMapping("/unsave")
    public ResponseEntity<String> unsaveEvent(@RequestParam("eventTitle") String eventTitle, @RequestParam("userId") Long userId){
        System.out.println("unsaving Event");
        savedEventService.unsaveEvent(eventTitle, userId);
        return ResponseEntity.ok("Event saved successfully!");
    }





}

