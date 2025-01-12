package com.project.event_service.service;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.event_service.model.Event;
import com.project.event_service.repo.FormRepo;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ViewService {

    @Autowired
    private FormRepo formRepo;

    @Autowired
    private CommentService commentService;
   

    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");


    public List<Event> getAllEvents() {
        System.out.println("finding all");

        //Business logic
        List<Event> all_events =  formRepo.findAll();
        LocalDate currentDate = LocalDate.now();

        // for(Event event : all_events){
        //     String eventdate =  event.getDate();
        //    // String eventTime = event.getTime();

        //     LocalDate eventDate = LocalDate.parse(eventdate, dateFormatter);
        //     // LocalDateTime eventDateTime = LocalDateTime.of(eventDate, LocalDate.parse(eventTimeString).atStartOfDay().toLocalTime()); // Combine date and time if needed


        //     if(currentDate.isAfter(eventDate)){
        //         System.out.println("Deleting date on "+eventDate);
        //          commentService.deletedeventcomments(event.getId());
        //         deleteEvent(event.getId());
        //     }
        // }

        return formRepo.findAll();

    }

    public Event getEventById(long id) {
        Optional<Event> optEvent = formRepo.findById(id);
        if(optEvent.isPresent()){
            return optEvent.get();
        }

        return null;
    }

    public void deleteEvent(long id) {
        commentService.deletedeventcomments(id);
        formRepo.deleteById(id);
    }

    public List<Event> getongoingEvents() {

        // Retrieve all events
        List<Event> all_events = formRepo.findAll();
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
            //List<Event> updated = getAllEvents();
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

            //send message to kafka topic with eventname and email


        } else {
            // Handle the case when the event with the given id doesn't exist
            throw new RuntimeException("Event not found with id " + id);
        }
    }

    public List<Event> getEventsByClub(String name) {

        return formRepo.findByClub(name);
    }

    public byte[] getEventImage(Long id) {
        Event event = formRepo.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        return event.getImage();
    }
}

