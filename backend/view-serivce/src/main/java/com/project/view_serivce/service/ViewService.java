package com.project.view_serivce.service;




import com.project.view_serivce.feign.AddEventService;
import com.project.view_serivce.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ViewService {

    //@Autowired
    // FormRepo formRepo;
    @Autowired
    AddEventService eventService;

    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");


    public List<Event> getAllEvents() {
        System.out.println("finding all");

        //Business logic
        List<Event> all_events =  eventService.getAllEvents().getBody();
        LocalDate currentDate = LocalDate.now();

        for(Event event : all_events){
            String eventdate =  event.getDate();
           // String eventTime = event.getTime();

            LocalDate eventDate = LocalDate.parse(eventdate, dateFormatter);
            // LocalDateTime eventDateTime = LocalDateTime.of(eventDate, LocalDate.parse(eventTimeString).atStartOfDay().toLocalTime()); // Combine date and time if needed

            if(currentDate.isAfter(eventDate)){
                System.out.println("Deleting date on "+eventDate);
                eventService.deleteById(event.getId()).getBody();
            }
        }

        return eventService.getAllEvents().getBody();

    }

    public Event getEventById(long id) {
        return eventService.getById(id).getBody();
    }

    public void deleteEvent(long id) {
        eventService.deleteById(id);
    }

    public List<Event> getongoingEvents() {

        // Retrieve all events
        List<Event> all_events = eventService.getAllEvents().getBody();
        LocalDate currentDate = LocalDate.now();
        //LocalTime currentTime = LocalTime.now();
        List<Event> ongoing = new ArrayList<>();

        for (Event event : all_events) {
            String eventdate =  event.getDate();
           // String eventTime = event.getTime();

            LocalDate eventDate = LocalDate.parse(eventdate, dateFormatter);

            // Check if the event is today and the current time is before or during the event
            if (currentDate.isEqual(eventDate)) {
                ongoing.add(event);
            }
        }

        return ongoing;

    }

    public List<Event> getPublicEvents(){
        return eventService.getPublicEvents().getBody();
    }

    public void updateEvent(long id, Event updatedEvent) {
        eventService.updateEvent(id,updatedEvent);
    }

    public List<Event> getEventsByClub(String name) {
        return eventService.getEventsByClub(name).getBody();
    }

    public byte[] getEventImage(Long id) {
        return eventService.getEventImage(id).getBody();
    }
}

