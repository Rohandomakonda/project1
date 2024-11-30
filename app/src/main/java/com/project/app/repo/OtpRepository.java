package com.project.app.repo;

import com.project.app.model.OtpEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpEntity, Long> {
    Optional<OtpEntity> findTopByEmailOrderByExpiryTimeDesc(String email);
}
