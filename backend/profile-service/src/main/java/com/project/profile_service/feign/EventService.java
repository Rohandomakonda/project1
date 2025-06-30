package com.project.profile_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.project.profile_service.dto.Event;
import com.project.profile_service.model.ConductedEvent;

import java.util.List;

@FeignClient("event-service")
public interface EventService {
    @PostMapping("api/events/inclikes/{eventid}")
    public void inclikes(@PathVariable long eventid);

    @PostMapping("api/events/declikes/{eventid}")
    public void declikes(@PathVariable long eventid);

    @PostMapping("api/events/decsaves/{eventTitle}")
    public void decsaves(@PathVariable String eventTitle);

    @PostMapping("api/events/incsaves/{eventid}")
    public void incsaves(@PathVariable long eventid);

    @DeleteMapping("conducted/event/{id}")
    public ResponseEntity<ConductedEvent> deleteConductedEvent(@PathVariable Long id);

    @GetMapping("api/events/getById/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id);
    
    @GetMapping("api/events/getclubevents/{name}")
    public ResponseEntity<List<Event>> getClubByName(@PathVariable String name);

}
