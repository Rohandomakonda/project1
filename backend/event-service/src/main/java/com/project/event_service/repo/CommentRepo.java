package com.project.event_service.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.event_service.model.Comment;

import java.util.List;
public interface CommentRepo extends JpaRepository<Comment, Integer> {

    // Write a query which returns the list of objects where EventId == postid
    @Query("SELECT c FROM Comment c WHERE c.EventId = :postid")
    List<Comment> findByEventId(@Param("postid") Long postid);
}

