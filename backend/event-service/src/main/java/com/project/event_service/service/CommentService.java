package com.project.event_service.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.event_service.dto.CommentResponse;
import com.project.event_service.feign.UserContext;
import com.project.event_service.model.Comment;
import com.project.event_service.repo.CommentRepo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private UserContext cta;

    public List<CommentResponse> getcomments(long postid){
        List<Comment> m1 = commentRepo.findByEventId(postid);

        List<CommentResponse> m2 = new ArrayList<>();
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

    public Comment editcomment(String m, Long cid, Long uid, long eid) {
        Comment c=commentRepo.findById(cid);
        if(c.getUserId()==uid){
            LocalDateTime currentTime = LocalDateTime.now();
            LocalDateTime fiveHoursAgo = currentTime.minusHours(5);

            // if(c.getCreatedAt().isBefore(fiveHoursAgo)){
            //     System.out.println("cannnot edit after 5 hrs");

            // }
            // else{
            //    c.setMsg(m);
            //    commentRepo.save(c);
            // }
        }
        else{
            System.out.println("this comment cannot be edited by someone else");
        }
        return c;
    }

    public Comment deletecomment(Long cid, Long uid, long eid) {
        Comment c=commentRepo.findById(cid);
        if(c.getUserId()==uid){
            LocalDateTime currentTime = LocalDateTime.now();
            LocalDateTime fiveHoursAgo = currentTime.minusHours(5);

            // if(c.getCreatedAt().isBefore(fiveHoursAgo)){
            //     System.out.println("cannnot delete after 5 hrs");

            // }
            // else{

            //     commentRepo.delete(c);
            // }
        }
        else{
            System.out.println("this comment cannot be deleted by someone else");
        }
        return c;
    }

    public void deletedeventcomments(long eid) {
        List<Comment> c=commentRepo.findByEventId(eid);
        for(Comment comment: c){
            commentRepo.delete(comment);
        }


    }
}


