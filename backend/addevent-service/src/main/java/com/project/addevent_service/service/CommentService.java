package com.project.addevent_service.service;

import com.project.addevent_service.dto.CommentResponse;
import com.project.addevent_service.feign.connecttoauth;
import com.project.addevent_service.model.Comment;
import com.project.addevent_service.repo.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private connecttoauth cta;

    public List<CommentResponse> getcomments(long postid){
        List<Comment> m1 = commentRepo.findByEventId(postid);

        List<CommentResponse> m2=new ArrayList<>();
        for(Comment comment: m1){
            String name=cta.getUserbyId(comment.getUserId());

            m2.add(new CommentResponse(name,comment.getMsg()));


        }
        return m2;

    }

    public Comment postcomment(String m, long uid, long eid) {
        Comment comment=new Comment();
        comment.setMsg(m);
        comment.setUserId(uid);
        comment.setEventId(eid);

        return commentRepo.save(comment);

    }
}

