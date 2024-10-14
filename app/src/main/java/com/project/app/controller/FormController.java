package com.project.app.controller;
import com.project.app.model.Event;
import com.project.app.service.FormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
public class FormController {

    @Autowired
    FormService service;

    @PostMapping("/addevent")
    public List<Event> addEvent(@RequestBody Event event){

        System.out.println("added event "+event.isPublic());
        service.addEvent(event);
        return service.show();
    }


}

// controller          service   repository layer
// talks to client     business  talks with database
