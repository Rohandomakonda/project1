package com.project.addevent_service.service;





import com.project.addevent_service.model.Event;
import com.project.addevent_service.repo.FormRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Time;
import java.util.Date;
import java.util.List;
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

    public byte[] getEventImage(Long id) {
        Event event = repo.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        return event.getImage();
    }

    public List<Event> getAllEvents() {
        return repo.findAll();
    }

    public void deleteById(long id) {
        repo.deleteById(id);
    }

    public List<Event> getEventsByClub(String name) {
            return repo.findByClub(name);
    }

    public List<Event> getPublicEvents() {
           return repo.findByisPublicTrue();
    }

    public Optional<Event> getById(long id){
        return repo.findById(id);
    }

    public void updateEvent(long id, Event updatedEvent) {
        Optional<Event> existingEventOpt = repo.findById(id);

        if (existingEventOpt.isPresent()) {
            Event existingEvent = existingEventOpt.get();

            // Update the event fields
            existingEvent.setTitle(updatedEvent.getTitle());
            existingEvent.setDescription(updatedEvent.getDescription());
            existingEvent.setDate(updatedEvent.getDate());
            existingEvent.setTime(updatedEvent.getTime());
            existingEvent.setVenue(updatedEvent.getVenue());
            existingEvent.setClub(updatedEvent.getClub());

            // Save the updated event back to the repository
            repo.save(existingEvent);

            //send message to kafka topic with eventname and email


        } else {
            // Handle the case when the event with the given id doesn't exist
            throw new RuntimeException("Event not found with id " + id);
        }
    }
}


