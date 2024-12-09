package com.project.app.repo;

import com.project.app.model.SavedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedEventRepository extends JpaRepository<SavedEvent,Long> {

}
