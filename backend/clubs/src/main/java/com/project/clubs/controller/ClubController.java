package com.project.clubs.controller;


import com.project.clubs.model.Club;
import com.project.clubs.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

