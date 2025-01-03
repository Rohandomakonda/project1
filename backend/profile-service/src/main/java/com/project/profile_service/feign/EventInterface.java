package com.project.profile_service.feign;

import com.project.profile_service.dto.Event;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(name="ADDEVENT-SERVICE")
public interface EventInterface {
    @GetMapping("/getById/{id}")
    public ResponseEntity<Event> getById(@PathVariable Long id);
}
