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
            Date eventdate = event.getDate();
            LocalDate eventLocalDate = eventdate.toLocalDate();
            if(currentDate.isAfter(eventLocalDate)){
                System.out.println("Deleting date on "+eventLocalDate);
                formRepo.deleteById(event.getId());
            }
        }

        return formRepo.findAll();
    }

    public Event getEventById(int id) {
        return formRepo.findById(id).orElse(new Event());
    }

    public void deleteEvent(int id) {
        formRepo.deleteById(id);
    }

    public List<Event> getongoingEvents() {

            // Retrieve all events
            List<Event> all_events = formRepo.findAll();
            LocalDate currentDate = LocalDate.now();
            LocalTime currentTime = LocalTime.now();
            List<Event> ongoing = new ArrayList<>();

            for (Event event : all_events) {
                Date eventDate = event.getDate();
                Time eventTime = event.getTime();
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
}
