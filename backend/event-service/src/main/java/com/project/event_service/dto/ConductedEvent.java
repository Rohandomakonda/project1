package com.project.event_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConductedEvent {
    //title,category,likes,clubname
    private String title;
    private String category;
    private long likes;
    private String clubname;

    public ConductedEvent(String title, String category, long likes, String clubname) {
        this.title = title;
        this.category = category;
        this.likes = likes;
        this.clubname = clubname;
    }
}
