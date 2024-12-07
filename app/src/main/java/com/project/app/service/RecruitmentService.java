package com.project.app.service;


import com.project.app.model.Event;
import com.project.app.model.Recruitment;
import com.project.app.repo.RecruitmentRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    public Recruitment saveRecruitment(String title, String description, String date, String time, String venueDescription, String venue, String club, String formLink, @org.jetbrains.annotations.NotNull MultipartFile image) throws IOException {
        Recruitment recruitment = new Recruitment();
        recruitment.setTitle(title);
        recruitment.setDescription(description);
        recruitment.setDate(date);
        recruitment.setTime(time);
        recruitment.setVenue(venue);
        recruitment.setClub(club);
        recruitment.setVenueDescription(venueDescription);
        recruitment.setFormLink(formLink);

        if (!image.isEmpty()) {
            recruitment.setImage(image.getBytes());
        }

        recruitmentRepo.save(recruitment);

        return recruitment;


    }

    public void updateRecruitment(int id, Recruitment recruitment) {
        recruitmentRepo.save(recruitment);
    }

    public void deleteRecruitment(int id) {
        recruitmentRepo.deleteById(id);
    }
}