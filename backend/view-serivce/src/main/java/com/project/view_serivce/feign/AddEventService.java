package com.project.view_serivce.feign;

import com.project.view_serivce.model.Event;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@FeignClient(name = "ADDEVENT-SERVICE")
public interface AddEventService {

    @GetMapping("api/events/getEvents")
    public ResponseEntity<List<Event>> getAllEvents();

    @DeleteMapping("api/events/deleteEvent/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id);

    @GetMapping("api/events/getEventImage/{id}")
    public ResponseEntity<byte[]> getEventImage(@PathVariable long id);

    @GetMapping("api/events/getEventsByClub/{name}")
    public ResponseEntity<List<Event>> getEventsByClub(@PathVariable String name);

    @GetMapping("api/events/getPublicEvents")
    public ResponseEntity<List<Event>> getPublicEvents();

    @GetMapping("api/events/getById/{id}")
    public ResponseEntity<Event> getById(@PathVariable long id);

    @PutMapping("api/events/getUpdatedEvent/{id}")
    public void updateEvent(@PathVariable long id,@RequestBody Event updatedEvent);
}
