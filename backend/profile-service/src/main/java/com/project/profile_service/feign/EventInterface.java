package com.project.profile_service.feign;

import com.project.profile_service.dto.Event;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@FeignClient(name="EVENT-SERVICE")
public interface EventInterface {
    @GetMapping("api/events/getById/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id);
}
