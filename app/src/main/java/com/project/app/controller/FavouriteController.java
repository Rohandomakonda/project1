package com.project.app.controller;


import com.project.app.dto.LikeEventsResponse;
import com.project.app.model.Event;
import com.project.app.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FavouriteController {

   @Autowired
   private FavouriteService favouriteService;

    @PostMapping("like/{eventId}/{userId}")
    public ResponseEntity<String> addFavorite(@PathVariable("eventId") Long eventId, @PathVariable("userId") Long userId) {
        System.out.println("calling addFavourite "+eventId+" "+userId);
        favouriteService.addFavorite(eventId, userId);
        return ResponseEntity.ok("Event added to favorites!");

    }
    @DeleteMapping("dislike/{eventId}/{userId}")
    public ResponseEntity<String> dislike(@PathVariable("eventId") Long eventId, @PathVariable("userId") Long userId){
        System.out.println("disliking the event "+eventId+" "+userId);
        favouriteService.removeFavorite(eventId, userId);
        return ResponseEntity.ok("Event removed from favorites!");
    }
    @GetMapping("/getalllikedevents")
    public ResponseEntity<List<LikeEventsResponse>> getlikedevents(@RequestParam("userId") Long userId) {
        try {
            List<LikeEventsResponse> events = favouriteService.getAllLikedEvents(userId);
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // User not found
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);  // No favorite events
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // General error
        }
    }

    @GetMapping("/isliked/{eventId}/{userId}")
    public ResponseEntity<Boolean> getisLiked(@PathVariable("eventId") Long eventId, @PathVariable("userId") Long userId){
        boolean isLiked = favouriteService.isLiked(eventId,userId);

        return new ResponseEntity<>(isLiked,HttpStatus.OK);
    }
}

