package com.project.profile_service.controller;


import java.util.List;

import com.project.profile_service.dto.UpcomingEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.profile_service.dto.Users;
import com.project.profile_service.model.ConductedEvent;
import com.project.profile_service.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/profile")
public class DashBoardController {
    
    @Autowired
    private DashboardService dashboardService;


    @PostMapping("/add-deleted-event")
    ResponseEntity<String> addDeletedEvent(@RequestBody ConductedEvent event){
            dashboardService.addDeletedEvent(event);
            return ResponseEntity.ok("added");
    }
    
    @PostMapping("/get-club-total-events/{clubname}")
    ResponseEntity<Long> totalEvents(@PathVariable String clubname){
        return ResponseEntity.ok(dashboardService.totalEvents(clubname));
    }

    @PostMapping("/get-club-total-members/{clubname}")
    ResponseEntity<List<Users>> getAllUsersByclubname(@PathVariable String clubname){
        
        return ResponseEntity.ok(dashboardService.getAllUsersByclubname(clubname));
    }

    @GetMapping("/previous-ten/{clubname}")
    public ResponseEntity<List<ConductedEvent>> getprevten(@PathVariable String clubname) {
        return ResponseEntity.ok(dashboardService.getprevten(clubname));
    }
    @GetMapping("/average-like-category/{clubname}/{category}")
    public ResponseEntity<Long> getavglikes(@PathVariable("clubname") String clubname,@PathVariable("category") String category) {
        return ResponseEntity.ok(dashboardService.getavglikes(clubname,category));
    }
    @GetMapping("/upcoming-events/{clubname}")
    public ResponseEntity<List<UpcomingEvent>> upcomingevents(@PathVariable("clubname") String clubname) {
        return ResponseEntity.ok(dashboardService.upcomingevents(clubname));
    }
    
}
