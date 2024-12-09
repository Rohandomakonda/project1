package com.project.app.controller;


import com.project.app.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class FavouriteController {

   @Autowired
   private FavouriteService favouriteService;

    @PostMapping("favourites/{eventId}")
    public ResponseEntity<String> addFavorite(@PathVariable Long eventId, @RequestParam Long userId) {
        favouriteService.addFavorite(eventId, userId);
        return ResponseEntity.ok("Event added to favorites!");

    }
}

