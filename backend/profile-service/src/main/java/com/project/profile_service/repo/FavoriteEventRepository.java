package com.project.profile_service.repo;

import com.project.profile_service.model.FavoriteEvent;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteEventRepository extends JpaRepository<FavoriteEvent, Long> {
    
    
    @Query("SELECT f.eventId FROM FavoriteEvent f WHERE f.userId = :userId")
    List<Long> findByUserId(@Param("userId") Long userId);

    Optional<FavoriteEvent> findByUserIdAndEventId(Long userId, Long eventId);
    boolean existsByUserIdAndEventId(Long userId, Long eventId);
    void deleteByUserIdAndEventId(Long userId, Long eventId);
}
