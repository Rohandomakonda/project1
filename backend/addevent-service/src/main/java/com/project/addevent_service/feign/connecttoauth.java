package com.project.addevent_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("auth-service")
public interface connecttoauth {
    @GetMapping("/api/auth/getusername/{id}")
    public String getUserbyId(@PathVariable Long id);
}
