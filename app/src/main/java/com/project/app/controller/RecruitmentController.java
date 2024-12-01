package com.project.app.controller;


import com.project.app.model.Recruitment;
import com.project.app.service.RecruitmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/api/postRecruitment")
    public ResponseEntity<?> postRecruitment(@Valid @RequestBody Recruitment recruitment){

        recruitmentService.addRecruitment(recruitment);

        return ResponseEntity.ok("Succesfully posted");
    }

}
