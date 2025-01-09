package com.project.event_service.controller;


import com.project.event_service.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.event_service.model.Event;
import com.project.event_service.service.ViewService;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class ViewController {

    @Autowired
    private ViewService viewservice;




    @GetMapping("/viewevents")
    public ResponseEntity<List<Event>> getAllEvents(){
        System.out.println("going to call getAllEvents to add-service");
        if(viewservice.getAllEvents() != null)
            return new ResponseEntity<>(viewservice.getAllEvents(),HttpStatus.OK);
        else{
            return new ResponseEntity<>(viewservice.getAllEvents(),HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/event/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        byte[] image = viewservice.getEventImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // or IMAGE_PNG
                .body(image);
    }

    @GetMapping("/getclubevents/{name}")
    public ResponseEntity<List<Event>> getClubByName(@PathVariable String name){
        List<Event> events = viewservice.getEventsByClub(name);
        return new ResponseEntity<>(events,HttpStatus.OK);
    }


    @GetMapping("/ongoingevents")
    public ResponseEntity<List<Event>> getOngoingEvents(){
        if(viewservice.getongoingEvents() != null)
            return new ResponseEntity<>(viewservice.getongoingEvents(),HttpStatus.OK);
        else{
            return new ResponseEntity<>(viewservice.getongoingEvents(),HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/public/events")
    public ResponseEntity<List<Event>> getPublicEvents(){
        if(viewservice.getPublicEvents() != null){

            return new ResponseEntity<>(viewservice.getPublicEvents(),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(viewservice.getPublicEvents(),HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<List<Event>> deleteEvent(@PathVariable int id){

        Event event = viewservice.getEventById(id);
        if(event != null){
            viewservice.deleteEvent(id);
            List<Event> events = viewservice.getAllEvents();
            return new ResponseEntity<>(events, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getEvent/{id}")
    public Event getEventToUpdate(@PathVariable int id){
        return viewservice.getEventById(id);
    }

    @PutMapping("/updateEvent/{id}")
    public void updateEvent(@PathVariable int id,@RequestBody Event event){
        viewservice.updateEvent(id,event);
    }

    @GetMapping("api/events/getById/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id){
        Event event = viewservice.getEventById(id);
        return ResponseEntity.ok(event);
    }
}


