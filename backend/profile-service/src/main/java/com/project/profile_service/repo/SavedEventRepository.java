package com.project.profile_service.repo;

import com.project.profile_service.model.SavedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedEventRepository extends JpaRepository<SavedEvent,Long> {
    Optional<SavedEvent> findByUserIdAndTitle(Long userId,String eventTitle);
    List<SavedEvent> findByUserId(Long userId);
}
