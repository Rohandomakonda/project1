package com.project.profile_service.service;

import java.util.ArrayList;
import java.util.List;

import com.project.profile_service.dto.ConductedEventReq;
import com.project.profile_service.dto.Event;
import com.project.profile_service.dto.UpcomingEvent;
import com.project.profile_service.feign.EventService;
import org.springframework.beans.factory.annotation.Autowired;

import com.project.profile_service.dto.Users;
import com.project.profile_service.feign.UserContext;
import com.project.profile_service.model.ConductedEvent;
import com.project.profile_service.repo.DashboardRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private DashboardRepo dashboardRepo;

    @Autowired
    private UserContext userContext;
    @Autowired
    private EventService eventService;

    public void addDeletedEvent(ConductedEventReq event) {
        ConductedEvent ce = new ConductedEvent();
        ce.setTitle(event.getTitle());
        ce.setCategory(event.getCategory());
        ce.setClubName(event.getClubName());
        ce.setLikes(event.getLikes());
        dashboardRepo.save(ce);
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
       List<ConductedEvent> conductedevents = dashboardRepo.findTop10ByClubNameOrderByIdDesc(clubname);
       return conductedevents;
    }

    public Long getavglikes(String clubname, String category) {
        long temp = 0L; // Use 'long' (lowercase) for primitive type
        System.out.println("clubname and category "+ clubname+" "+category);
        
        
        List<ConductedEvent> conductedevents = dashboardRepo.findByClubNameAndCategory(clubname, category);
        System.out.println("size of conducted events "+ conductedevents.size());
        for (ConductedEvent e : conductedevents) {
            System.out.println("likes is "+e.getLikes());
            temp += e.getLikes();
        }
        // if (!conductedevents.isEmpty()) {
        //     temp = temp / conductedevents.size();
        // } else {
        //     temp = 0L;
        // }

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
