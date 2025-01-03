package com.project.view_serivce.feign;

import com.project.view_serivce.model.Event;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@FeignClient(name = "ADDEVENT-SERVICE")
public interface AddEventService {

    @GetMapping("/getEvents")
    public ResponseEntity<List<Event>> getAllEvents();

    @DeleteMapping("/deleteEvent/{id}")
    public ResponseEntity<?> deleteById(@PathVariable long id);

    @GetMapping("/getEventImage/{id}")
    public ResponseEntity<byte[]> getEventImage(@PathVariable long id);

    @GetMapping("/getEventsByClub/{name}")
    public ResponseEntity<List<Event>> getEventsByClub(@PathVariable String name);

    @GetMapping("/getPublicEvents")
    public ResponseEntity<List<Event>> getPublicEvents();

    @GetMapping("/getById/{id}")
    public ResponseEntity<Event> getById(@PathVariable long id);

    @PutMapping("/getUpdatedEvent/{id}")
    public void updateEvent(@PathVariable long id,@RequestBody Event updatedEvent);
}
