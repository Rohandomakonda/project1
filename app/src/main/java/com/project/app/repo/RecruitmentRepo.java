package com.project.app.repo;

import com.project.app.model.Recruitment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitmentRepo extends JpaRepository<Recruitment,Integer> {
}
