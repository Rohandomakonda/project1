package com.project.app.controller;
import com.project.app.model.Event;
import com.project.app.service.EmailService;
import com.project.app.service.FormService;
import com.project.app.service.UserService;
import jakarta.mail.Multipart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class FormController {

    @Autowired
    private FormService service;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;


    @PostMapping("/addevent")
    public ResponseEntity<?> addEvent(@RequestPart Event event, @RequestPart MultipartFile image) {
        try {
            Event savedEvent = service.addEvent(event, image);

            // Send email to all users
            List<String> emailAddresses = userService.getAllUserEmails(); // Fetch user emails
            emailAddresses.forEach(email ->
                    emailService.sendEmail(email, "New Event Added", "A new event has been added: " + event.getTitle())
            );

            return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}

