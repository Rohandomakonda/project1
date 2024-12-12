package com.project.app.service;

import com.project.app.dto.LikeEventsResponse;
import com.project.app.model.Event;
import com.project.app.model.User;
import com.project.app.repo.FormRepo;
import com.project.app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class FavouriteService {
    @Autowired
    private FormRepo eventRepository;

    @Autowired
    private UserRepository userRepository;

    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public void addFavorite(Long eventId, Long userId) {
        boolean isLiked=false;
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new UsernameNotFoundException("Event not found"));
        LocalDate eventDate = LocalDate.parse(event.getDate(), dateFormatter);
        if (eventDate.isBefore(LocalDate.now())) {
            throw new IllegalStateException("Only upcoming or ongoing events can be added to favorites.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<LikeEventsResponse> alleventsLikeByUser = getAllLikedEvents(user.getId());
        for(LikeEventsResponse likedevents : alleventsLikeByUser){
            if(likedevents.getId()==event.getId()){
                System.out.println("already liked");
                isLiked=true;
                break;
            }
        }

        if (!isLiked) {
        user.getFavoriteEvents().add(event);
        userRepository.save(user);
        }
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

    public List<LikeEventsResponse> getAllLikedEvents(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<Event> events = user.getFavoriteEvents();
        List<LikeEventsResponse> likedEvents = new ArrayList<>();
        if (events == null) {
            throw new NoSuchElementException("User has no favorite events");
        }

        for(Event event : events){
            LikeEventsResponse likeEvents = new LikeEventsResponse();
            likeEvents.setId(event.getId());
            likeEvents.setTitle(event.getTitle());
            likeEvents.setDate(event.getDate());
            likeEvents.setDate(event.getDate());
            likeEvents.setVenueDescription(event.getVenueDescription());
            likeEvents.setVenue(event.getVenue());
            likeEvents.setClub(event.getClub());
            likeEvents.setPublic(event.isPublic());
            likeEvents.setImage(event.getImage());
             likedEvents.add(likeEvents);
        }
        return likedEvents;
    }

    public boolean isLiked(Long eventId,Long userId) {
        boolean liked=false;
        Optional<Event> event = eventRepository.findById(eventId);
        if(!event.isPresent()){
            return false;
        }

        Event event1 = event.get();


        Optional<User> user1 = userRepository.findById(userId);

        if(!user1.isPresent()){return false;}

        User user = user1.get();


        List<LikeEventsResponse> alleventsLikeByUser = getAllLikedEvents(user.getId());
        for(LikeEventsResponse likedevents : alleventsLikeByUser){
            if(Objects.equals(likedevents.getId(), event1.getId())){
                liked=true;
                break;
            }
        }

        return liked;


    }
}
