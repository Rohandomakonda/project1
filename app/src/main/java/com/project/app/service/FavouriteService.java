package com.project.app.service;

import com.project.app.model.Event;
import com.project.app.model.User;
import com.project.app.repo.FormRepo;
import com.project.app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class FavouriteService {
    @Autowired
    private FormRepo eventRepository;

    @Autowired
    private UserRepository userRepository;

    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public void addFavorite(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new UsernameNotFoundException("Event not found"));
        LocalDate eventDate = LocalDate.parse(event.getDate(), dateFormatter);
        if (eventDate.isBefore(LocalDate.now())) {
            throw new IllegalStateException("Only upcoming or ongoing events can be added to favorites.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.getFavoriteEvents().add(event);
        userRepository.save(user);
    }

    public void removeFavorite(Long eventId, Long userId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new UsernameNotFoundException("Event not found"));


        LocalDate eventDate = LocalDate.parse(event.getDate(), dateFormatter);
        if (eventDate.isBefore(LocalDate.now())) {
            throw new IllegalStateException("Only upcoming or ongoing events can be removed from favorites.");
        }


        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        user.getFavoriteEvents().remove(event);


        userRepository.save(user);
    }

}
