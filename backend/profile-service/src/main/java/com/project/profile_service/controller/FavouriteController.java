package com.project.profile_service.controller;

import com.project.profile_service.dto.Event;
import com.project.profile_service.feign.UserContext;
import com.project.profile_service.service.FavoriteEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class FavouriteController {
    @Autowired
    private FavoriteEventService favoriteEventService;

    @Autowired
    private UserContext usercontext;

    @GetMapping
    public ResponseEntity<List<Event>> getUserFavorites(@RequestHeader("X-User-ID") String userId) {
        Long userid = usercontext.getUserId(userId).getBody();
        System.out.println("user id is "+userid);
        List<Event> events = favoriteEventService.getUserFavorites(userid);
        
        for(Event event : events){
            System.out.println("controller is "+event.getTitle());
        }
        return ResponseEntity.ok(events);
    }

    @PostMapping("/{eventId}")
    public ResponseEntity<?> addFavorite(
            @PathVariable Long eventId,
            @RequestHeader("X-User-ID") String userId) {
        System.out.println(userId);
        Long userid = usercontext.getUserId(userId).getBody();
        System.out.println(userid);
        favoriteEventService.addFavorite(userid, eventId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable("eventId") Long eventId,@RequestHeader("X-User-ID") String userId) {
        Long userid = usercontext.getUserId(userId).getBody();
        favoriteEventService.removeFavorite(eventId,userid);
        return ResponseEntity.noContent().build();
    }
}
