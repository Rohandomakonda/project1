package com.project.app.controller;


import com.project.app.model.Club;
import com.project.app.model.Event;
import com.project.app.model.Recruitment;
import com.project.app.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
public class ClubController {

    @Autowired
    ClubService clubService;

    @GetMapping("/viewclubs")
    public ResponseEntity<List<Club>> getAllClubs(){
           List<Club> allClubs = clubService.getAllClubs();

           return new ResponseEntity<>(allClubs,HttpStatus.OK);

    }

//    @PostMapping(value = "/addClub",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Club> addRecruitment(
//
//            @RequestParam("clubname") String clubname,
//            @RequestParam("description") String description,
//            @RequestParam("events-list") List<Event> events,
//            @RequestParam("image") MultipartFile image) throws IOException {
//
//        // Save event and image
//        System.out.println("adding club");
//        Club club = clubService.saveClub(clubname, description,events, image);
//        return ResponseEntity.ok(club);
//    }

    @PostMapping("/addClub")
    public ResponseEntity<?> addClub(@RequestBody Club club){


        try {
            clubService.saveClub(club.getClubname(),club.getDescription(),club.getImage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok(club);
    }

    @GetMapping("/getclub/{name}")
    public ResponseEntity<?> getClubDetails(@PathVariable String name){
            Club clubDetails  = clubService.getClubDetails(name);

            return ResponseEntity.ok(clubDetails);
    }

}
