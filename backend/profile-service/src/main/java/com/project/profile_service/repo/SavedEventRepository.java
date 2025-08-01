package com.project.profile_service.repo;

import com.project.profile_service.model.SavedEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedEventRepository extends JpaRepository<SavedEvent,Long> {
    @Query("SELECT s.id FROM SavedEvent s WHERE s.userId = :userId AND s.title = :title")
    Optional<Long> findEventIdByUserIdAndTitle(@Param("userId") Long userId, @Param("title") String title);
    List<SavedEvent> findByUserId(Long userId);
}
