package com.project.app.service;


import com.project.app.model.Event;
import com.project.app.repo.FormRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class FormService {

    @Autowired
    FormRepo repo;

    public Event addEvent(Event event, MultipartFile image) throws IOException {

        event.setImageName(image.getOriginalFilename());
        event.setImageType(image.getContentType());
        event.setImageData(image.getBytes());

        return repo.save(event);
    }

    public List<Event> show() {
        return repo.findAll();

    }
}

//[            ]
