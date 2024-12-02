package com.project.app.service;

import com.project.app.model.Event;
import com.project.app.repo.FormRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.Duration;
import java.time.LocalDate;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ViewSerivce {

    @Autowired
    FormRepo formRepo;

    public List<Event> getAllEvents() {
        System.out.println("finding all");

        //Business logic
        List<Event> all_events =  formRepo.findAll();
        LocalDate currentDate = LocalDate.now();
        for(Event event : all_events){
            Date eventdate = Date.valueOf(event.getDate());
            LocalDate eventLocalDate = eventdate.toLocalDate();
            if(currentDate.isAfter(eventLocalDate)){
                System.out.println("Deleting date on "+eventLocalDate);
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
                Date eventDate = Date.valueOf(event.getDate());
                Time eventTime = Time.valueOf(event.getTime());
                LocalDate eventLocalDate = eventDate.toLocalDate();
                LocalTime eventLocalTime = eventTime.toLocalTime();

                // Check if the event is today and the current time is before or during the event
                if (currentDate.isEqual(eventLocalDate) && !currentTime.isAfter(eventLocalTime)) {
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

}
