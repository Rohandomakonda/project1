package com.project.addevent_service.repo;






import java.util.List;

import com.project.addevent_service.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface FormRepo extends JpaRepository<Event,Long> {


    List<Event> findByisPublicTrue();

    List<Event> findByClub(String name);
}
