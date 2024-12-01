package com.project.app.controller;
import com.project.app.model.Event;
import com.project.app.service.FormService;
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
    FormService service;

    @PostMapping("/addevent")
    public ResponseEntity<?> addEvent(@RequestPart Event event, @RequestPart MultipartFile image){

        Event savedEvent = null;
        try {
            savedEvent = service.addEvent(event,image);
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}

// controller          service   repository layer
// talks to client     business  talks with database
