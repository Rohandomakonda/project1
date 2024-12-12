package com.project.app.service;

import com.project.app.model.Event;
import com.project.app.model.SavedEvent;
import com.project.app.model.User;
import com.project.app.repo.FormRepo;
import com.project.app.repo.SavedEventRepository;
import com.project.app.repo.UserRepository;
import jakarta.persistence.Lob;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SavedEventService {
        @Autowired
        private FormRepo eventRepository;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private SavedEventRepository savedEventRepository;

    public void saveEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new UsernameNotFoundException("Event not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        SavedEvent savedEvent = new SavedEvent();
        savedEvent.setTitle(event.getTitle());
        savedEvent.setDescription(event.getDescription());
        savedEvent.setDate(event.getDate());
        savedEvent.setTime(event.getTime());
        savedEvent.setVenue(event.getVenue());
        savedEvent.setVenueDescription(event.getVenueDescription());
        savedEvent.setClub(event.getClub());
        savedEvent.setImage(event.getImage());
        savedEvent.setUser(user);


        savedEventRepository.save(savedEvent);

    }



    @Transactional
    public void unsaveEvent(String eventTitle, Long userId) {
        System.out.println("Attempting to unsave event with title: " + eventTitle + " for user ID: " + userId);

        // Fetch user from the database
        Optional<User> user = userRepository.findById(userId);
        User user1= user.get();

        System.out.println("User found: " + user1.getId());
//

        Optional<SavedEvent> savedEvent = savedEventRepository.findByUserAndTitle(user1, eventTitle);
        SavedEvent se1= savedEvent.get();

        System.out.println("SavedEvent found: " + se1.getTitle());

        // Delete the event from the saved events list
        savedEventRepository.delete(se1);
        System.out.println("Event unsaved successfully!");
    }

    @Transactional
    public List<Event> getsavedEvents(Long userId) {
        List<Event> res = new ArrayList<>();  // Initialize the result list
        List<SavedEvent> ses = savedEventRepository.findByUserId(userId);

        // Iterate over the saved events and map them to Event objects
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

        Optional<User> user1 = userRepository.findById(userId);

        if(!user1.isPresent()){
            return false;
        }

        User user = user1.get();

       Optional<SavedEvent> isSavedEvent = savedEventRepository.findByUserAndTitle(user,eventTitle);

       if(isSavedEvent.isPresent()){
           return true;
       }

       return false;

    }
}
