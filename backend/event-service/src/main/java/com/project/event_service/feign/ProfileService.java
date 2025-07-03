package com.project.event_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.event_service.dto.ConductedEvent;

@FeignClient(name = "PROFILE-SERVICE",url="https://profile-service-vx93.onrender.com")
public interface ProfileService {
    @DeleteMapping("api/profile/favourites/remove/{eventId}")
    public ResponseEntity<Void> removeFavoriteForAll(@PathVariable Long eventId);

    @PostMapping("api/profile/add-deleted-event")
    ResponseEntity<String> addDeletedEvent(@RequestBody ConductedEvent event);
}
