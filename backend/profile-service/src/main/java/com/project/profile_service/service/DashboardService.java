package com.project.profile_service.service;

import java.util.ArrayList;
import java.util.List;

import com.project.profile_service.dto.Event;
import com.project.profile_service.dto.UpcomingEvent;
import com.project.profile_service.feign.EventService;
import org.springframework.beans.factory.annotation.Autowired;

import com.project.profile_service.dto.Users;
import com.project.profile_service.feign.UserContext;
import com.project.profile_service.model.ConductedEvent;
import com.project.profile_service.repo.DashboardRepo;
import org.springframework.http.ResponseEntity;

public class DashboardService {

    @Autowired
    private DashboardRepo dashboardRepo;

    @Autowired
    private UserContext userContext;
    @Autowired
    private EventService eventService;

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

    public Long getavglikes(String clubname, String category) {
        long temp = 0L; // Use 'long' (lowercase) for primitive type
        List<ConductedEvent> conductedevents = dashboardRepo.findByClubNameAndCategory(clubname, category);

        for (ConductedEvent e : conductedevents) {
            temp += e.getLikes();
        }
        if (!conductedevents.isEmpty()) {
            temp = temp / conductedevents.size();
        } else {
            temp = 0L;
        }

        return temp;
    }

    public List<UpcomingEvent> upcomingevents(String clubname) {
        List<Event> e=eventService.getClubByName(clubname).getBody();
        List<UpcomingEvent> e1=new ArrayList<>();
        for(Event p:e){
            e1.add(new UpcomingEvent(p.getTitle(),p.getDate(),p.getCategory()));
        }
        return e1;



    }
}
