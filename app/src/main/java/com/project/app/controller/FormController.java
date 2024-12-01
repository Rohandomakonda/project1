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
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FormController {

    @Autowired
    private FormService service;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @PostMapping(value = "/addevent",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addEvent(
            @RequestPart("event") Event event,
            @RequestPart("imageFile") MultipartFile image) {
        System.out.println("adding");
        try {
            // Validate input
            if (event == null || image == null || image.isEmpty()) {
                return new ResponseEntity<>("Event data or image file is missing",
                        HttpStatus.BAD_REQUEST);
            }

            Event savedEvent = service.addEvent(event, image);

            // Send email to all users
            List<String> emailAddresses = userService.getAllUserEmails();
            emailAddresses.forEach(email ->
                    emailService.sendEmail(
                            email,
                            "New Event Added",
                            "A new event has been added: " + event.getTitle()
                    )
            );

            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);

        } catch (IOException e) {
            return new ResponseEntity<>("Error processing the request: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("Unexpected error: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}