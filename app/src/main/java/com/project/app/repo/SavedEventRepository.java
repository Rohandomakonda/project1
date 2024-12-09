package com.project.app.repo;

import com.project.app.model.SavedEvent;
import com.project.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface SavedEventRepository extends JpaRepository<SavedEvent,Long> {
    Optional<SavedEvent> findByUserAndTitle(User user, String title);


}
