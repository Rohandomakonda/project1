package com.project.app.service;

import com.project.app.model.Event;
import com.project.app.model.SavedEvent;
import com.project.app.model.User;
import com.project.app.repo.FormRepo;
import com.project.app.repo.SavedEventRepository;
import com.project.app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
}
