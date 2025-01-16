package com.project.event_service.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDateTime;


@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String msg;
    private Long EventId;
    private Long UserId;
    // @CreationTimestamp
    // @Column(updatable = false) // Automatically set during creation, not updatable
    // private LocalDateTime createdAt;

    public Long getUserId() {
        return UserId;
    }

    public String getMsg() {
        return msg;
    }

    // public LocalDateTime getCreatedAt() {
    //     return createdAt;
    // }

    public void setMsg(String m) {
        this.msg=m;
    }

    public void setUserId(long uid) {
        this.UserId=uid;
    }

    public void setEventId(long eid) {
        this.EventId=eid;
    }


    // public void setMsg(String m) {
    //     this.msg=m;
    // }
    // public void setEventId(Long m) {
    //     this.EventId=m;
    // }
    // public void setUserId(Long m) {
    //     this.UserId=m;
    // }

    // public Long getUserId() {
    //     return this.UserId;
    // }

    // public String getMsg() {
    //     return this.msg;
    // }
}

