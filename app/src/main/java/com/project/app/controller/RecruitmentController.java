package com.project.app.controller;


import com.project.app.model.Event;
import com.project.app.model.Recruitment;
import com.project.app.service.RecruitmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RecruitmentController {

    @Autowired
    private RecruitmentService recruitmentService;




    @GetMapping("/api/getAllRecruitments")
    public List<Recruitment> getAllRecruitments(){
        return recruitmentService.getAllRecruitments();
    }

    @PostMapping(value = "/api/postRecruitment",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Recruitment> addRecruitment(

            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("date") String date,
            @RequestParam("time") String time,
            @RequestParam("venue") String venue,
            @RequestParam("club") String club,
            @RequestParam("venueDescription") String venueDescription,
            @RequestParam("formLink") String formLink,
            @RequestParam("image") MultipartFile image) throws IOException {

        // Save event and image
        System.out.println("adding Recruitment");
        Recruitment recruitment = recruitmentService.saveRecruitment(title, description, date, time,venueDescription, venue, club, formLink, image);
        return ResponseEntity.ok(recruitment);
    }
    @PutMapping("/updateRecruitment/{id}")
    private ResponseEntity<?> updateRecruitment(@PathVariable int id, @RequestBody Recruitment recruitment){
         recruitmentService.updateRecruitment(id,recruitment);
        return ResponseEntity.ok("Recruitment updated");

    }
    @DeleteMapping("/deleteRecruitment/{id}")
    private ResponseEntity<?> deleteRecruitment(@PathVariable int id){
        recruitmentService.deleteRecruitment(id);
        return ResponseEntity.ok("Recruitment delete");
    }
    @GetMapping("/getRecruitment/{id}")
    private ResponseEntity<?> getRecruitment(@PathVariable int id){

        return ResponseEntity.ok(recruitmentService.getRecruitment(id));
    }




}
