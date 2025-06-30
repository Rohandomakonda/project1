package com.project.clubs.repo;



import com.project.clubs.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepo extends JpaRepository<Club,Integer> {

    Club findByclubname(String clubName);
}

