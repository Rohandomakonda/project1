package com.project.add_recruitments.repo;

import com.project.add_recruitments.model.Recruitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentRepo extends JpaRepository<Recruitment,Integer> {
}
