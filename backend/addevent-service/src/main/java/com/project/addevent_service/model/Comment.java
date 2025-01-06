package com.project.addevent_service.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String msg;


    private Long EventId;


    private Long UserId;


    public void setMsg(String m) {
        this.msg=m;
    }
    public void setEventId(Long m) {
        this.EventId=m;
    }
    public void setUserId(Long m) {
        this.UserId=m;
    }

    public Long getUserId() {
        return this.UserId;
    }

    public String getMsg() {
        return this.msg;
    }
}
