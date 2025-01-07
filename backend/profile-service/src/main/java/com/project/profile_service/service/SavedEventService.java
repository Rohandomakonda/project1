package com.project.profile_service.service;




import com.project.profile_service.dto.Event;
import com.project.profile_service.feign.EventInterface;
import com.project.profile_service.feign.EventService;
import com.project.profile_service.model.SavedEvent;
import com.project.profile_service.repo.SavedEventRepository;
import jakarta.persistence.Lob;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SavedEventService {


    @Autowired
    private SavedEventRepository savedEventRepository;

    @Autowired
    private EventInterface eventInterface;

    @Autowired
    private EventService eventService;

    public void saveEvent(Long eventId, Long userId) {
        Event event = eventInterface.getById(eventId).getBody();



            SavedEvent savedEvent = new SavedEvent();
        assert event != null;
        savedEvent.setTitle(event.getTitle());
            savedEvent.setDescription(event.getDescription());
            savedEvent.setDate(event.getDate());
            savedEvent.setTime(event.getTime());
            savedEvent.setVenue(event.getVenue());
            savedEvent.setVenueDescription(event.getVenueDescription());
            savedEvent.setClub(event.getClub());
            savedEvent.setImage(event.getImage());
            savedEvent.setUserId(userId);
            eventService.incsaves(eventId);




        savedEventRepository.save(savedEvent);

    }



    @Transactional
    public void unsaveEvent(String eventTitle, Long userId) {
        System.out.println("Attempting to unsave event with title: " + eventTitle + " for user ID: " + userId);

        Optional<SavedEvent> savedEvent = savedEventRepository.findByUserIdAndTitle(userId, eventTitle);
        SavedEvent se1= savedEvent.get();

        System.out.println("SavedEvent found: " + se1.getTitle());

        // Delete the event from the saved events list
        savedEventRepository.delete(se1);
        eventService.decsaves(eventTitle);

        System.out.println("Event unsaved successfully!");
    }

    @Transactional
    public List<Event> getsavedEvents(Long userId) {
        List<Event> res = new ArrayList<>();  // Initialize the result list
        List<SavedEvent> ses = savedEventRepository.findByUserId(userId);


        for (SavedEvent se : ses) {
            Event temp = new Event();
            temp.setTitle(se.getTitle());
            temp.setDescription(se.getDescription());
            temp.setDate(se.getDate());
            temp.setTime(se.getTime());
            temp.setVenue(se.getVenue());
            temp.setClub(se.getClub());
            temp.setVenueDescription(se.getDescription());

            temp.setImage(se.getImage()); // Set image as null or handle accordingly

            res.add(temp);
        }

        return res; // Return the list of events
    }

    public Boolean isSaved(Long userId, String eventTitle) {

        Optional<SavedEvent> savedEvent = savedEventRepository.findByUserIdAndTitle(userId,eventTitle);

        return savedEvent.isPresent();

    }
}

