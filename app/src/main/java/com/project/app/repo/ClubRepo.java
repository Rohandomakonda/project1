package com.project.app.repo;

import com.project.app.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubRepo extends JpaRepository<Club,Integer> {

    Club findByclubname(String clubName);
}
