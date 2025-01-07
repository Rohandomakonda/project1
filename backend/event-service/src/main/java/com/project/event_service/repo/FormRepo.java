package com.project.event_service.repo;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.event_service.model.Event;

@Repository
public interface FormRepo extends JpaRepository<Event,Long> {


    List<Event> findByisPublicTrue();

    List<Event> findByClub(String name);

    Optional<Event> findByTitle(String eventTitle);
}

