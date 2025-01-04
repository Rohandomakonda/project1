package com.project.profile_service.controller;

import com.project.profile_service.dto.Event;
import com.project.profile_service.feign.UserContext;
import com.project.profile_service.service.SavedEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class SavedController {

    @Autowired
    private SavedEventService savedEventService;

    @Autowired
    private UserContext userContext;

    @PostMapping("/saved-events/{eventId}")
    public ResponseEntity<String> saveEvent(@PathVariable("eventId") Long eventId, @RequestHeader("X-User-ID") String userId) {
        Long userid = userContext.getUserId(userId).getBody();
        savedEventService.saveEvent(eventId, Long.valueOf(userid));
        return ResponseEntity.ok("Event saved successfully!");
    }
    @DeleteMapping("/saved-events/unsave")
    public ResponseEntity<String> unsaveEvent(@RequestParam("eventTitle") String eventTitle, @RequestHeader("X-User-ID") String userId) {
        System.out.println("Received request to unsave event with title: " + eventTitle + " for user ID: " + userId);
        Long userid = userContext.getUserId(userId).getBody();
        try {
            savedEventService.unsaveEvent(eventTitle, userid);
            return ResponseEntity.ok("Event unsaved successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error unsaving event: " + e.getMessage());
        }
    }


    @GetMapping("/saved-events/getallsavedevents")
    public ResponseEntity<List<Event>> getsavedevents(@RequestHeader("X-User-ID") String userId) {
        System.out.println("get saved Events");
        Long userid = userContext.getUserId(userId).getBody();
        return new ResponseEntity<>(savedEventService.getsavedEvents(userid), HttpStatus.OK);
    }

    @GetMapping("/saved-events/issaved")
    public ResponseEntity<Boolean> isSaved(@RequestHeader("X-User-ID") String userId,@RequestParam("eventTitle") String eventTitle){
        Long userid = userContext.getUserId(userId).getBody();
        return new ResponseEntity<>( savedEventService.isSaved(userid,eventTitle),HttpStatus.OK);
    }





}


