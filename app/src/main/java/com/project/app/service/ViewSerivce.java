package com.project.app.service;

import com.project.app.model.Event;
import com.project.app.repo.FormRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.Duration;
import java.time.LocalDate;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ViewSerivce {

    @Autowired
    FormRepo formRepo;
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Autowired
    FavouriteService favouriteService;


    public List<Event> getAllEvents() {
        System.out.println("finding all");

        //Business logic
        List<Event> all_events =  formRepo.findAll();
        LocalDate currentDate = LocalDate.now();
        for(Event event : all_events){
            String eventdate =  event.getDate();
            String eventTime = event.getTime();

            LocalDate eventDate = LocalDate.parse(eventdate, dateFormatter);
           // LocalDateTime eventDateTime = LocalDateTime.of(eventDate, LocalDate.parse(eventTimeString).atStartOfDay().toLocalTime()); // Combine date and time if needed
            System.out.println("event date of "+event.getId()+" "+eventDate);
            System.out.println("current Date is "+currentDate);
            System.out.println("can be deleted "+currentDate.isAfter(eventDate));
            if(currentDate.isAfter(eventDate)){
                System.out.println("Deleting date on "+eventDate);
                formRepo.deleteById(event.getId());
            }
        }

       return formRepo.findAll();

    }

    public Event getEventById(long id) {
        return formRepo.findById(id).orElse(new Event());
    }

    public void deleteEvent(long id) {
        formRepo.deleteById(id);
    }

    public List<Event> getongoingEvents() {

            // Retrieve all events
            List<Event> all_events = formRepo.findAll();
            LocalDate currentDate = LocalDate.now();
            LocalTime currentTime = LocalTime.now();
            List<Event> ongoing = new ArrayList<>();

            for (Event event : all_events) {
                String eventdate =  event.getDate();
                String eventTime = event.getTime();

                LocalDate eventDate = LocalDate.parse(eventdate, dateFormatter);

                // Check if the event is today and the current time is before or during the event
                if (currentDate.isEqual(eventDate)) {
                    ongoing.add(event);
                }
            }

            return ongoing;

    }

    public List<Event> getPublicEvents(){
        return formRepo.findByisPublicTrue();
    }

    public void updateEvent(long id, Event updatedEvent) {
        Optional<Event> existingEventOpt = formRepo.findById(id);

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
            formRepo.save(existingEvent);
        } else {
            // Handle the case when the event with the given id doesn't exist
            throw new RuntimeException("Event not found with id " + id);
        }
    }

    public List<Event> getEventsByClub(String name) {
       return formRepo.findByClub(name);
    }
}
