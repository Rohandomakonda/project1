package com.project.notification_service.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.notification_service.model.EventNotification;

@Repository
public interface NotificationRepository extends JpaRepository<EventNotification, Long> {
    List<EventNotification> findByUserIdAndIsReadFalse(Long userId);
    Optional<EventNotification> findByEventIdAndUserId(Long eventId, Long userId);
}
