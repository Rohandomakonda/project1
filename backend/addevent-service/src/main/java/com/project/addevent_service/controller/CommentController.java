package com.project.addevent_service.controller;


import com.project.addevent_service.dto.CommentResponse;
import com.project.addevent_service.model.Comment;
import com.project.addevent_service.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/getcomment/{eventid}")
    public ResponseEntity<List<CommentResponse>> getcomments(@PathVariable Long eventid){
        return new ResponseEntity<>(commentService.getcomments(eventid), HttpStatus.OK);


    }
    @PostMapping("/postcomment")
    public ResponseEntity<Comment>  postcomment(@RequestParam("msg")  String m, @RequestParam("user_id") long uid, @RequestParam("event_id") long eid){
        Comment comment=commentService.postcomment(m,uid,eid);
        return ResponseEntity.ok(comment);
    }

}
