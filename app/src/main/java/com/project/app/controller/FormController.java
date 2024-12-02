package com.project.app.controller;

import com.project.app.model.Event;
import com.project.app.service.EmailService;
import com.project.app.service.FormService;
import com.project.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Time;
import java.util.List;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/addevents")
public class FormController {

    @Autowired
    private FormService service;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Event> addEvent(

            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("date") String date,
            @RequestParam("time") String time,
            @RequestParam("venue") String venue,
            @RequestParam("club") String club,
            @RequestParam("isPublic") boolean isPublic,
            @RequestParam("venueDescription") String venueDescription,
            @RequestParam("image") MultipartFile image) throws IOException {

        // Save event and image
        System.out.println("adding");
        Event event = service.saveEvent(title, description, date, time,venueDescription, venue, club, isPublic, image);
        return ResponseEntity.ok(event);
    }

}