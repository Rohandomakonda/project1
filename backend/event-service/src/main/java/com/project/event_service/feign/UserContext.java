package com.project.event_service.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.project.event_service.dto.User;

@FeignClient(name="AUTH-SERVICE",url="https://auth-service-ivhs.onrender.com")
public interface UserContext {
    @GetMapping("api/auth/getUserId/{username}")
    public ResponseEntity<Long> getUserId(@PathVariable String username);

    @GetMapping("/api/auth/getusername/{id}")
    public String getUserbyId(@PathVariable Long id);

     @GetMapping("/api/auth/users")
    List<User> getAllUsers();

}
