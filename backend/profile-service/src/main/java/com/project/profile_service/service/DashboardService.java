package com.project.profile_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.project.profile_service.dto.Users;
import com.project.profile_service.feign.UserContext;
import com.project.profile_service.model.ConductedEvent;
import com.project.profile_service.repo.DashboardRepo;

public class DashboardService {

    @Autowired
    private DashboardRepo dashboardRepo;

    @Autowired
    private UserContext userContext;

    public void addDeletedEvent(ConductedEvent event) {
        dashboardRepo.save(event);
    }

    public Long totalEvents(String club) {
        
        List<ConductedEvent> conductedEvents = dashboardRepo.findByClubName(club);
        return (long) conductedEvents.size();
    }

    public List<Users> getAllUsersByclubname(String club) {
        
       List<Users> usersByClub =  userContext.getAllUsersByClubname(club).getBody();

       return usersByClub;
        
    }

    public List<ConductedEvent> getprevten(String clubname) {
       List<ConductedEvent> conductedevents = dashboardRepo.findTop10ByClubnameOrderByIdDesc(clubname);
       return conductedevents;
    }

}
