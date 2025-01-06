package com.project.addevent_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

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
