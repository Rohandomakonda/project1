package com.project.app.repo;


import com.project.app.model.Event;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface FormRepo extends JpaRepository<Event,Long> {

    
    List<Event> findByisPublicTrue();

}
