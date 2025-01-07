package com.project.event_service.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.project.event_service.model.Event;
import com.project.event_service.repo.FormRepo;
import java.io.IOException;
import java.util.Optional;


@Service
public class FormService {

    @Autowired
    private FormRepo repo;

    @Autowired
    private KafkaTemplate<String,Event> kafkaTemplate;



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

         //Save the image as bytes in the database
        if (!image.isEmpty()) {
            event.setImage(image.getBytes());
        }

        // Send Kafka message for new event
        Event message = new Event();
        message.setId(event.getId());
        message.setTitle(event.getTitle());
        message.setDescription(event.getDescription());
        message.setDate(event.getDate());
        message.setTime(event.getTime());
        message.setVenue(event.getVenue());
        message.setClub(event.getClub());

        //kafkaTemplate.send("new-events", message);

        System.out.println("sent to kafka");

        return repo.save(event);
    }

     public void inclikes(long eventId) {
        Event event = repo.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setLikes(event.getLikes()+1);
        repo.save(event);
    }
    public  void declikes(Long eventId) {
        Event event = repo.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setLikes(event.getLikes()-1);
        repo.save(event);


    }
    public void incsaves(Long eventId) {
        Event event = repo.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
        event.setSaves(event.getSaves()+1);
        repo.save(event);
    }
    public void decsaves(String eventTitle) {
        Optional<Event> event = repo.findByTitle(eventTitle);
        if(event.isPresent()){
            Event e=event.get();
            e.setSaves(e.getSaves()-1);
            repo.save(e);
        }
    }


}



