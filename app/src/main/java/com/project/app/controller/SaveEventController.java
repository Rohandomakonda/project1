package com.project.app.controller;

import com.project.app.service.SavedEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

public class SaveEventController {

    @Autowired
    private SavedEventService savedEventService;

    @PostMapping("saved-events/{eventId}")
    public ResponseEntity<String> saveEvent(@PathVariable Long eventId, @RequestParam Long userId) {
        savedEventService.saveEvent(eventId, userId);
        return ResponseEntity.ok("Event saved successfully!");
    }


}

