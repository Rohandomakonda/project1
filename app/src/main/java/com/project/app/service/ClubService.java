package com.project.app.service;



import com.project.app.model.Club;
import com.project.app.repo.ClubRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ClubService {

    @Autowired
    ClubRepo clubrepo;


    public List<Club> getAllClubs() {
        List<Club> allClubs = clubrepo.findAll();

        return allClubs;
    }

    public void saveClub(String clubname, String description, byte[] image) throws IOException {
        Club club = new Club();

        club.setClubname(clubname);
        club.setDescription(description);


        if(image != null){
            club.setImage(image);
        }

        clubrepo.save(club);


    }

    public Club getClubDetails(String clubName) {

           Club clubDetails =  clubrepo.findByclubname(clubName);

           return clubDetails;
    }
}
