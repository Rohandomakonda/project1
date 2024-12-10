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
        savedEvent.setVenue(event.getVenue());
        savedEvent.setUser(user);

        savedEventRepository.save(savedEvent);

    }

    public void unsaveEvent(String eventTitle, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        SavedEvent savedEvent = savedEventRepository.findByUserAndTitle(user, eventTitle)
                .orElseThrow(() -> new UsernameNotFoundException("Event not found in user's saved events"));


        savedEventRepository.delete(savedEvent);
    }
    @Transactional
    public List<Event> getsavedEvents(Long userId) {
        List<Event> res = new ArrayList<>();  // Initialize the result list
        List<SavedEvent> ses = savedEventRepository.findByUserId(userId); // Make sure the method is correctly named

        // Iterate over the saved events and map them to Event objects
        for (SavedEvent se : ses) {
            Event temp = new Event();
            temp.setTitle(se.getTitle());
            temp.setDescription(se.getDescription());
            temp.setDate(se.getDate());
            temp.setTime(null); // Set time to null or handle if necessary
            temp.setVenue(se.getVenue());
            temp.setClub(null); // Set to null if no club data is available
            temp.setVenueDescription(null); // Handle this if you want a default value

            temp.setImage(null); // Set image as null or handle accordingly

            // Add the event to the result list
            res.add(temp);
        }

        return res; // Return the list of events
    }

}
