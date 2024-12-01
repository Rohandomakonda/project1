package com.project.app.service;


import com.project.app.model.Recruitment;
import com.project.app.repo.RecruitmentRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruitmentService {

    @Autowired
    RecruitmentRepo recruitmentRepo;

    public List<Recruitment> getAllRecruitments() {
       return recruitmentRepo.findAll();
    }

    public void addRecruitment(@Valid Recruitment recruitment) {
        recruitmentRepo.save(recruitment);

    }
}
