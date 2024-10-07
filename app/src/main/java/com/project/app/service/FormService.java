package com.project.app.service;


import com.project.app.model.Event;
import com.project.app.repo.FormRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormService {

    @Autowired
    FormRepo repo;

    public void addEvent(Event event) {
        repo.save(event);
        System.out.println("saved");
    }

    public List<Event> show() {
        return repo.findAll();

    }
}

//[            ]
