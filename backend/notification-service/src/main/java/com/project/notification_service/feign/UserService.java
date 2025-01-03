package com.project.notification_service.feign;


import com.project.notification_service.dto.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "AUTH-SERVICE",url="http://localhost:8090")
public interface UserService {
    @GetMapping("/api/auth/users")
    List<User> getAllUsers();
}
