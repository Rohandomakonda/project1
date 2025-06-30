package com.project.event_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;


@Data
public class CommentResponse {
    @JsonProperty
    String username;
    @JsonProperty
    String msg;

    public CommentResponse(String name,String m){
        username=name;
        msg=m;
    }

}
