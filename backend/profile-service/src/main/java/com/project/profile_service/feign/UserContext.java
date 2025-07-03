package com.project.profile_service.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.profile_service.dto.Users;

@FeignClient(name="AUTH-SERVICE",url="https://auth-service-ivhs.onrender.com")
public interface UserContext {
    @GetMapping("api/auth/getUserId/{username}")
    public ResponseEntity<Long> getUserId(@PathVariable String username);

    @GetMapping("api/auth/getUserByClub/{club}")
    public ResponseEntity<List<Users>> getAllUsersByClubname(@PathVariable String club);

}
