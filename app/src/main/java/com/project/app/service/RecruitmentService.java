package com.project.app.service;


import com.project.app.model.Event;
import com.project.app.model.Recruitment;
import com.project.app.repo.RecruitmentRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class RecruitmentService {

    @Autowired
    RecruitmentRepo recruitmentRepo;
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<Recruitment> getAllRecruitments() {
        List<Recruitment> recs= recruitmentRepo.findAll();
        LocalDate currentDate = LocalDate.now();
        for(Recruitment rec: recs){
            String recdate =  rec.getDate();
            LocalDate recDate = LocalDate.parse(recdate, dateFormatter);
            if(currentDate.isAfter(recDate)){
                System.out.println("Deleting date on "+recDate);
                recruitmentRepo.deleteById(rec.getId());
            }
        }
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
       Optional<Recruitment> rec=recruitmentRepo.findById(id);

        if (rec.isPresent()) {
            Recruitment rec1 = rec.get();

            // Update the event fields
            rec1.setTitle(recruitment.getTitle());
            rec1.setDescription(recruitment.getDescription());
            rec1.setDate(recruitment.getDate());
            rec1.setTime(recruitment.getTime());
            rec1.setVenue(recruitment.getVenue());
            rec1.setClub(recruitment.getClub());
            rec1.setDescription(recruitment.getVenueDescription());


            // Save the updated event back to the repository
            recruitmentRepo.save(rec1);
        } else {
            // Handle the case when the event with the given id doesn't exist
            throw new RuntimeException("recruitment not found with id " + id);
        }





    }

    public void deleteRecruitment(int id) {
        recruitmentRepo.deleteById(id);
    }

    public Recruitment getRecruitment(int id) {
        return recruitmentRepo.findById(id).orElse(new Recruitment());
    }
}