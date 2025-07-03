package com.project.event_service.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.project.event_service.model.Event;
import com.project.event_service.service.FormService;

@RestController
@RequestMapping("api/events")
public class FormController {

    @Autowired
    private FormService service;


    @PostMapping(value="/addevents",consumes = MediaType.MULTIPART_FORM_DATA_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Event> addEvent(

            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("date") String date,
            @RequestParam("time") String time,
            @RequestParam("venue") String venue,
            @RequestParam("club") String club,
            @RequestParam("category") String category,
            @RequestParam("isPublic") boolean isPublic,
            @RequestParam("venueDescription") String venueDescription,
            @RequestParam("image") MultipartFile image) throws IOException {

        // Save event and image
        System.out.println("adding");
        Event event = service.saveEvent(title, description, date, time,venueDescription, venue, club,category, isPublic, image);

        return ResponseEntity.ok(event);
    }

    @PostMapping("/inclikes/{eventid}")
    public void inclikes(@PathVariable long eventid){
      service.inclikes(eventid);

    }
    @PostMapping("/declikes/{eventid}")
    public void declikes(@PathVariable long eventid){
        service.declikes(eventid);

    }
    @PostMapping("/decsaves/{eventTitle}")
    public void decsaves(@PathVariable String eventTitle){

        service.decsaves(eventTitle);

    }
    @PostMapping("/incsaves/{eventid}")
    public void incsaves(@PathVariable long eventid){
        service.incsaves(eventid);

    }


}
