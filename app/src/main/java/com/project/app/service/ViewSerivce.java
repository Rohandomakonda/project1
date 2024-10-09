package com.project.app.service;

import com.project.app.model.Event;
import com.project.app.repo.FormRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViewSerivce {

    @Autowired
    FormRepo formRepo;

    public List<Event> getAllEvents() {
        System.out.println("finding all");
        return formRepo.findAll();
    }

    public Event getEventById(int id) {
        return formRepo.findById(id).orElse(new Event());
    }

    public void deleteEvent(int id) {
        formRepo.deleteById(id);
    }
}
