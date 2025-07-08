package com.project.profile_service.controller;

import com.project.profile_service.dto.Event;
import com.project.profile_service.feign.UserContext;
import com.project.profile_service.service.FavoriteEventService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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

    @GetMapping("getFavouritesByUser")
    public ResponseEntity<List<Event>> getUserFavorites(@RequestHeader("X-User-ID") String userId) {
        Long userid = usercontext.getUserId(userId).getBody();
        System.out.println("user id is "+userid);
        List<Event> events = favoriteEventService.getUserFavorites(userid);
        
        for(Event event : events){
            System.out.println("controller is "+event.getTitle());
        }
        return ResponseEntity.ok(events);
    }

    @PostMapping("favourites/{eventId}")
    public ResponseEntity<?> addFavorite(
            @PathVariable Long eventId,
            @RequestHeader("X-User-ID") String userId) {
        System.out.println(userId);
        Long userid = usercontext.getUserId(userId).getBody();
        System.out.println(userid);
        favoriteEventService.addFavorite(userid, eventId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("favourites/{eventId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable("eventId") Long eventId,@RequestHeader("X-User-ID") String userId) {
        Long userid = usercontext.getUserId(userId).getBody();
        favoriteEventService.removeFavorite(eventId,userid);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/isliked/{eventId}")
    public ResponseEntity<Boolean> getisLiked(@PathVariable("eventId") Long eventId, @RequestHeader("X-User-ID") String userId){
        Long userid = usercontext.getUserId(userId).getBody();
        System.out.println(eventId+" "+userid);
        boolean isLiked = favoriteEventService.isLiked(eventId,userid);

        return new ResponseEntity<>(isLiked,HttpStatus.OK);
    }

    @DeleteMapping("favourites/remove/{eventId}")
    @Transactional
    public ResponseEntity<Void> removeFavoriteForAll(@PathVariable Long eventId){
        favoriteEventService.removeFavoriteForAll(eventId);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
