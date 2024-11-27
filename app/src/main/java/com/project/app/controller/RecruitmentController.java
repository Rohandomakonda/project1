package com.project.app.controller;


import com.project.app.model.Recruitment;
import com.project.app.service.RecruitmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
