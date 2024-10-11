package com.project.app.controller;


import com.project.app.model.Event;
import com.project.app.service.ViewSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ViewController {

    @Autowired
    ViewSerivce viewservice;

    @GetMapping("/viewevents")
    public List<Event> getAllEvents(){
        return viewservice.getAllEvents();
    }

    @GetMapping("/ongoingevents")
    public List<Event> getOngoingEvents(){
       return viewservice.getongoingEvents();
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<List<Event>> deleteEvent(@PathVariable int id){

        Event event = viewservice.getEventById(id);
        if(event != null){
            viewservice.deleteEvent(id);
            List<Event> events = viewservice.getAllEvents();
        return new ResponseEntity<>(events, HttpStatus.CONTINUE);
        }
        else{
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }
}
