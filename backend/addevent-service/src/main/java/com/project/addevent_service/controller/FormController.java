package com.project.addevent_service.controller;


import com.project.addevent_service.model.Event;
import com.project.addevent_service.service.FormService;
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
public class FormController {

    @Autowired
    private FormService service;





    @PostMapping(value="/addevents",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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

    @GetMapping("/getEvents")
    public ResponseEntity<List<Event>> getAllEvents(){
        System.out.println("calling getAllEvents");
        if(service.getAllEvents() != null)
            return new ResponseEntity<>(service.getAllEvents(),HttpStatus.OK);
        else{
            return new ResponseEntity<>(service.getAllEvents(),HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/deleteEvent/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id){
        service.deleteById(id);
        return ResponseEntity.ok("deleted");
    }

    @GetMapping("/getEventImage/{id}")
    public ResponseEntity<byte[]> getEventImage(@PathVariable long id){
            return new ResponseEntity<>(service.getEventImage(id),HttpStatus.OK);
    }

    @GetMapping("/getEventsByClub/{name}")
    public ResponseEntity<List<Event>>getEventsByClub(@PathVariable String name){
            return new ResponseEntity<>(service.getEventsByClub(name),HttpStatus.OK);
    }

    @GetMapping("/getPublicEvents")
    public ResponseEntity<List<Event>> getPublicEvents(){
        return new ResponseEntity<>(service.getPublicEvents(),HttpStatus.OK);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id){
            Optional<Event> event = service.getById(id);

            if(event.isPresent()){
              Event realEvent = event.get();
              return new ResponseEntity<>(realEvent,HttpStatus.OK);
            }

            return new ResponseEntity<>(null,HttpStatus.OK);


    }

    @PutMapping("/getUpdatedEvent/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable long id,@RequestBody Event updatedEvent){
        service.updateEvent(id,updatedEvent);
        return ResponseEntity.ok("updated Event");
    }


}
