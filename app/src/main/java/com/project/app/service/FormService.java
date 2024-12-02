package com.project.app.service;


import com.project.app.model.Event;
import com.project.app.repo.FormRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Time;
import java.util.Date;
import java.util.List;

@Service
public class FormService {

    @Autowired
    FormRepo repo;

//    public Event addEvent(Event event, MultipartFile image) throws IOException {
//
//        event.setImageName(image.getOriginalFilename());
//        event.setImageType(image.getContentType());
//        event.setImageData(image.getBytes());
//
//        return repo.save(event);
//    }
//
//    public List<Event> show() {
//        return repo.findAll();
//
//    }

    @Transactional
    public Event saveEvent(String title, String description, String date, String time, String venueDescription, String venue, String club, boolean isPublic, MultipartFile image) throws IOException {
        Event event = new Event();
        event.setTitle(title);
        event.setDescription(description);
        event.setDate(date);
        event.setTime(time);
        event.setVenue(venue);
        event.setClub(club);
        event.setVenueDescription(venueDescription);
        event.setPublic(isPublic);

        // Save the image as bytes in the database
        if (!image.isEmpty()) {
            event.setImage(image.getBytes());
        }

        return repo.save(event);
    }

    public byte[] getEventImage(Long id) {
        Event event = repo.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        return event.getImage();
    }
}

//[            ]
