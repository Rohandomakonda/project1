package com.project.profile_service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.profile_service.model.ConductedEvent;

@Repository
public interface DashboardRepo extends JpaRepository<ConductedEvent,Long>{

    List<ConductedEvent> findByClubName(String club);

    List<ConductedEvent> findTop10ByClubNameOrderByIdDesc(String clubname);

    List<ConductedEvent> findByClubNameAndCategory(String clubName, String category);

}
