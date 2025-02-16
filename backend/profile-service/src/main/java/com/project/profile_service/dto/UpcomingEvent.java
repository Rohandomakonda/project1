package com.project.profile_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpcomingEvent {
    private String title;
    private String date;
    private String category;

    public UpcomingEvent(String title, String date, String category) {
        this.title=title;
        this.date=date;
        this.category=category;
    }

    // public UpcomingEvent(String title, String date, String category) {
    //     this.title = title;
    //     this.date = date;
    //     this.category = category;
    // }
}
