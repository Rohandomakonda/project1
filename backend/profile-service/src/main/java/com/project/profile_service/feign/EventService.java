package com.project.profile_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient("event-service")
public interface EventService {
    @PostMapping("api/events/inclikes/{eventid}")
    public void inclikes(@PathVariable long eventid);

    @PostMapping("api/events/declikes/{eventid}")
    public void declikes(@PathVariable long eventid);

    @PostMapping("api/events/decsaves/{eventTitle}")
    public void decsaves(@PathVariable String eventTitle);

    @PostMapping("api/events/incsaves/{eventid}")
    public void incsaves(@PathVariable long eventid);

}
