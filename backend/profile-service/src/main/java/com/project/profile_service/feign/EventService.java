package com.project.profile_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient("event-service")
public interface EventService {
    @PostMapping("api/events/inclikes/{id}")
    public void inclikes(@PathVariable long eventid);

    @PostMapping("api/events/declikes/{id}")
    public void declikes(@PathVariable long eventid);

    @PostMapping("api/events/decsaves/{id}")
    public void decsaves(@PathVariable String eventtitle);

    @PostMapping("api/events/incsaves/{id}")
    public void incsaves(@PathVariable long eventid);

}
