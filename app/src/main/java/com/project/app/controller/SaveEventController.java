package com.project.app.controller;

import com.project.app.service.SavedEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.app.model.Event;

import java.util.List;

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
    public ResponseEntity<String> unsaveEvent(@RequestParam("eventTitle") String eventTitle, @RequestParam("userId") Long userId) {
        System.out.println("Received request to unsave event with title: " + eventTitle + " for user ID: " + userId);

        try {
            savedEventService.unsaveEvent(eventTitle, userId);
            return ResponseEntity.ok("Event unsaved successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error unsaving event: " + e.getMessage());
        }
    }


    @GetMapping("/getallsavedevents")
    public ResponseEntity<List<Event>> getsavedevents(@RequestParam("userId") Long userId) {
        System.out.println("get saved Events");
        return new ResponseEntity<>(savedEventService.getsavedEvents(userId), HttpStatus.OK);
    }






}

