package com.project.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarEventDto {
    private String title;
    private String description;
    private String startDateTime;
    private String endDateTime;
    private String location;
}
