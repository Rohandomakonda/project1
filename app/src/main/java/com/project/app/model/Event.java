package com.project.app.model;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto-generates id
    private int id;
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String venue;
    private String club;
    private String venueDescription;
    @JsonProperty("isPublic")
    private boolean isPublic;
    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;

}
