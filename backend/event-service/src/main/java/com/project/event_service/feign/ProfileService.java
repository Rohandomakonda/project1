package com.project.event_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "PROFILE-SERVICE")
public interface ProfileService {
    @DeleteMapping("api/profile/favourites/remove/{eventId}")
    public ResponseEntity<Void> removeFavoriteForAll(@PathVariable Long eventId);
}
