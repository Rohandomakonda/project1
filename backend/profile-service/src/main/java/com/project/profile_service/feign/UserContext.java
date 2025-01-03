package com.project.profile_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="AUTH-SERVICE")
public interface UserContext {
    @GetMapping("api/auth/getUserId/{username}")
    public ResponseEntity<Long> getUserId(@PathVariable String username);

}
