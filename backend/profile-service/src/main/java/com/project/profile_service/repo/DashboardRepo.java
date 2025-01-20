package com.project.profile_service.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.profile_service.model.ConductedEvent;

public interface DashboardRepo extends JpaRepository<ConductedEvent,Long>{

    List<ConductedEvent> findByClubName(String club);

    List<ConductedEvent> findTop10ByClubnameOrderByIdDesc(String clubname);

    List<ConductedEvent> findByClubNameAndCategory(String clubName, String category);

}
