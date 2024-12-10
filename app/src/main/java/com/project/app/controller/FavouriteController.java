package com.project.app.controller;


import com.project.app.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}

