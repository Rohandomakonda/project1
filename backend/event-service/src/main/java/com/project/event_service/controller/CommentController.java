package com.project.event_service.controller;


import com.project.event_service.feign.UserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.event_service.dto.CommentResponse;
import com.project.event_service.model.Comment;
import com.project.event_service.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserContext usercontext;

    @GetMapping("/getcomment/{eventid}")
    public ResponseEntity<List<CommentResponse>> getcomments(@PathVariable Long eventid){
        return new ResponseEntity<>(commentService.getcomments(eventid), HttpStatus.OK);


    }
    @PostMapping("/postcomment")
    public ResponseEntity<List<CommentResponse>>  postcomment(@RequestParam("msg")  String m, @RequestParam("user_id") long uid, @RequestParam("event_id") long eid){
        System.out.println("hello");
        Comment comment=commentService.postcomment(m,uid,eid);
        return ResponseEntity.ok(commentService.getcomments(eid));
    }
    @PutMapping("/editcomment")
        public ResponseEntity<List<CommentResponse> > editcomment(@RequestParam("msg")  String m,@RequestParam("comment_id") Long cid,@RequestHeader("X-User-ID") String userId, @RequestParam("event_id") long eid){
            System.out.println("hello");

        Long uid = usercontext.getUserId(userId).getBody();
            Comment comment=commentService.editcomment(m,cid,uid,eid);
            return ResponseEntity.ok(commentService.getcomments(eid));
        }
    @DeleteMapping("/deletecomment")
    public ResponseEntity<List<CommentResponse> > deletecomment(@RequestParam("comment_id") Long cid,@RequestHeader("X-User-ID") String userId, @RequestParam("event_id") long eid){

        Long uid = usercontext.getUserId(userId).getBody();

        Comment comment=commentService.deletecomment(cid,uid,eid);
        return ResponseEntity.ok(commentService.getcomments(eid));
    }
//    @DeleteMapping("deletedeventcomments")
//    public ResponseEntity<?> deletecomment( @RequestParam("event_id") long eid){
//       commentService.deletedeventcomments(eid);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }






}

