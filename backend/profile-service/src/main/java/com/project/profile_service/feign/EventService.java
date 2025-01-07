package com.project.profile_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient("addevent-service")
public interface EventService {
    @PostMapping("/inclikes/{id}")
    public void inclikes(@PathVariable long eventid);

    @PostMapping("/declikes/{id}")
    public void declikes(@PathVariable long eventid);

    @PostMapping("/decsaves/{id}")
    public void decsaves(@PathVariable String eventtitle);

    @PostMapping("/incsaves/{id}")
    public void incsaves(@PathVariable long eventid);

}
